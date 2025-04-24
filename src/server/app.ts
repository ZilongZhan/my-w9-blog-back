import express from "express";
import morgan from "morgan";
import handleHealthCheck from "./middlewares/handleHealthCheck/handleHealthCheck.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";

const app = express();

app.use(morgan("dev"));

app.get("/", handleHealthCheck);

app.use("/posts");

app.use(handleEndpointNotFound);
app.use(handleErrors);

export default app;
