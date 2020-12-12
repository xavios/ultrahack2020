import jwt from "jsonwebtoken";
import { oauthSecret } from "./../configuration/auth.config";
import User, { IUser, UserType } from "../models/user.model";

export const VerifyToken = (req: any, res: any, next: any) => {
  let token: any = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No auth token provided!" });
  }

  jwt.verify(token, oauthSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = async (req: any, res: any, next: any) => {
  const user: IUser = await User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });

  if (user.userType != UserType.administrator) {
    res.status(403).send({ message: "Require Admin Role!" });
  }
  next();
  return;
};
