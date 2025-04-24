import { Request, Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";

const handleHealthCheck = (_req: Request, res: Response): void => {
  res.status(statusCodes.OK).json({ message: "OK" });
};

export default handleHealthCheck;
