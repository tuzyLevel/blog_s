import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";

import sequelize from "../../models";

import { getPasswordForValidation } from "../../utils";

// import { Result } from "@/index";
import { refresh, sign } from "../../utils/jwt";

export const loginTestFn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loginId, loginPassword } = req.body.loginData;

  const salt = process.env.ADMIN_SALT || "salt";

  const passwordValidationValue = getPasswordForValidation(loginPassword, salt);

  console.log(passwordValidationValue);

  const { User, Token } = sequelize.models;

  // if (loginId !== adminId) {
  //   result.code = "INCORRECT_ID";
  //   res.send(result);
  //   return;
  // }

  // if (passwordValidationValue !== adminPassword) {
  //   result.code = "INCORRECT_PASSWORD";
  //   res.send(result);
  //   return;
  // }

  // try {
  //   const user = await User.findOne({
  //     where: { userId: loginId },
  //   });
  //   if (user === null) {
  //     result.code = "INCORRECT_ID";
  //     res.send(result);
  //     return;
  //   }

  //   if (user && user.dataValues.password !== passwordValidationValue) {
  //     result.code = "INCORRECT_PASSWORD";
  //     res.send(result);
  //     return;
  //   }

  //   const accessToken = sign({ userId: loginId });
  //   const refreshToken = refresh();

  //   const refreshTokenRows = await Token.findOne({
  //     where: { userId: user.dataValues.userId },
  //     include: [{ model: User, attributes: ["uuid"] }],
  //   });

  //   if (refreshTokenRows) {
  //   }

  //   await Token.create({
  //     uuid: user.dataValues.uuid,
  //     accessToken: "default",
  //     refreshToken,
  //   });

  //   result.ok = true;
  //   result.code = "LOGIN_OK";
  //   result.data = {
  //     accessToken,
  //     refreshToken,
  //     tokenExpiresIn: process.env.JWT_EXPIRES_IN,
  //   };

  //   res.status(200).send(result);
  // } catch (e) {
  //   console.error(e);
  //   result.code = "TOKEN_ISSUE_FAILED";
  //   res.status(200).send(result);
  // }
  res.send("test");
};
