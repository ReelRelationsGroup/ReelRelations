const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "User Not Found";
  } catch (ex) {
    const error = new Error("Bad Credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  const expiresIn = "1d"; // Token expires in 1 day
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("Bad Credentials");
  error.status = 401;
  throw error;
};

User.authenticateGithub = async function (code) {
  let response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code,
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
    },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  const { access_token, error } = response.data;
  if (error) {
    const _error = new Error(error);
    _error.status = 401;
    throw _error;
  }

  response = await axios.get("https://api.github.com/user", {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  const { login } = response.data;

  let user = await User.findOne({
    where: { login },
  });

  if (!user) {
    const randomPassword = generateRandomPassword();
    user = await User.create({
      login,
      username: `Github-${login}`,
      password: await bcrypt.hash(randomPassword, 5),
    });
  }

  await user.update({
    username: `Github-${login}`,
  });

  return user.generateToken();
};

function generateRandomPassword() {
  const length = 12;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

module.exports = User;
