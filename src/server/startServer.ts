import "dotenv/config";
import createDebug from "debug";
import chalk from "chalk";
import app from "./app.js";

const debug = createDebug("posts:server:start");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug("++++++++++++++++++++++++++++++++++++++++++++++");
    debug(
      `🚀 ${chalk.bold.blue("Server running at")} ${chalk.green(
        `http://localhost:${port}`,
      )} 🚀`,
    );
    debug("++++++++++++++++++++++++++++++++++++++++++++++");
  });
};

export default startServer;
