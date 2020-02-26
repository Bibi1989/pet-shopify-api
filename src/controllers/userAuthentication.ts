import jwt from "jsonwebtoken";
import { NextFunction } from "express";

export const auth = (req: any, res: any, next: NextFunction) => {
  const token = req.headers["x-auth"];
  if (!token) {
    throw Error("unauthorize user, access denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
