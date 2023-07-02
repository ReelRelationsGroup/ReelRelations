const app = require("./app");
const { syncAndSeed } = require("./db");

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, "localhost", () =>
      console.log(`listening on port ${port}`)
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
