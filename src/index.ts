import "dotenv/config";
import startServer from "./server/startServer.js";

const port = Number(process.env.PORT ?? 3001);

startServer(port);
