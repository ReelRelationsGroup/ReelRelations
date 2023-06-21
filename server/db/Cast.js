const conn = require("./conn");
const { BOOLEAN, STRING, INTEGER, FLOAT } = conn.Sequelize;

const Cast = conn.define(
  "cast",
  {
    adult: {
      type: BOOLEAN,
      gender: INTEGER,
      id: {
        type: INTEGER,
        primaryKey: true,
      },
      known_for_department: STRING,
      name: STRING,
      original_name: STRING,
      popularity: FLOAT,
      profile_path: STRING,
      cast_id: INTEGER,
      character: STRING,
      credit_id: STRING,
      order: INTEGER,
    },
  },
  {
    timestamps: false, // set as false because api does not provide timestamps of when cast was added to database
  }
);

module.exports = Cast;
