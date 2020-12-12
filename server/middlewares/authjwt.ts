import jwt from "jsonwebtoken";
import { oauthSecret } from "./../configuration/auth.config";
import User, { IUser, UserType } from "../models/user.model";

export const VerifyToken = (res: any, req: any, next: any) => {
  let token: any = res.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No auth token provided!" });
  }

  jwt.verify(token, oauthSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
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
