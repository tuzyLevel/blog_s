import { Request, Response, NextFunction } from "express";

import crypto from "crypto";

import { sign, refresh, refreshVerify, verify } from "../../utils/jwt";

import Sequelize from "sequelize";
import sequelize from "../../models";

import { getSuccessResult, getErrorResult } from "../../utils/messages";

import { getPasswordForValidation } from "../../utils";

export const login = async (req: Request, res: Response) => {
  //get loginId, loginPw
  const { loginId, loginPassword } = req.body.loginData;
  const salt = process.env.ADMIN_SALT || "salt";
  const passwordValidationValue = getPasswordForValidation(loginPassword, salt);

  const { User, Token } = sequelize.models;

  try {
    //User Data Check
    const userRow = await User.findOne({
      where: { userId: loginId },
      include: [{ model: Token }],
    });
    if (!userRow) {
      res.send(getErrorResult("FAILED_FIND_USER"));
      return;
    }

    if (userRow && userRow.dataValues.password !== passwordValidationValue) {
      res.send(getErrorResult("INCORRECT_PASSWORD"));
      return;
    }

    //Refresh Token Check
    const refreshTokenRow = await Token.findOne({
      where: { uuid: userRow.dataValues.uuid },
      include: [{ model: User, attributes: ["userId", "uuid"] }],
    });

    const refreshToken = refresh();

    if (!refreshTokenRow) {
      //Emptry Row
      await Token.create({
        uuid: userRow.dataValues.uuid,
        accessToken: "default",
        refreshToken,
      });
      // } else if (
      //   //Exists Valid Refresh Token
      //   refreshVerify(refreshTokenRow.dataValues.refreshToken)
      // ) {
      //   refreshToken = refreshTokenRow.dataValues.refreshToken;
    } else {
      //Expired Refresh Token
      await refreshTokenRow.update({ refreshToken });
    }

    const accessToken = sign({ userId: loginId });

    res.send(
      getSuccessResult(200, "LOGIN_OK", {
        accessToken,
        refreshToken,
        tokenExpiredsIn: process.env.JWT_EXPIRES_IN,
      })
    );
  } catch (e) {
    console.error(e);
    res.send(getErrorResult("TOKEN_ISSUE"));
  }
};

export const logout = (req: Request, res: Response) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.send(getErrorResult("NO_AUTH"));
  }
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return getErrorResult("INVALID_ACCESS_TOKEN");

  const { User, Token } = sequelize.models;

  if (verify(accessToken))
    //인증 키값에 동봉된 Id로 uuid값 가져와서 refresh토큰 조회후에 삭제 하면 됨.
    //
    //Valid Access Token -> extract userId -> delete refreshToken
    //
    //Expired Access Token -> Already session ended
    //
    res.send("logout");
};
