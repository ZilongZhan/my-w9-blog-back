import "dotenv/config";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const port = process.env.PORT ?? 3001;

await connectToDatabase(
  "mongodb+srv://zilongzhan:cacasaurio3000plusmax@cluster-pro-max.zzkvldx.mongodb.net/blog",
);
startServer(port);
