import { oauthSecret } from "./../configuration/auth.config";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

export const SignIn = (req: any, res: any) => {
  const email: string = req.body.email;
  User.findOne({
    email: email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = req.body.password == user.password;

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, oauthSecret, {
      expiresIn: 86400, // 24 hours
    });

    var roles = [];

    roles.push("ROLE_" + user.userType.toUpperCase());

    res.status(200).send({
      id: user._id,
      email: user.email,
      roles: roles,
      accessToken: token,
    });
  });
};
