import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import sequelize from "../../models";

import { getErrorResult, getSuccessResult } from "../../utils/messages";

import { verify, refreshVerify, sign } from "../../utils/jwt";

export const renewalToken = async (req: Request, res: Response) => {
  const { authorization, refresh: refreshToken } = req.headers;
  const accessToken = authorization?.split("Bearer ")[1];

  if (
    !authorization ||
    !refreshToken ||
    !accessToken ||
    !(typeof refreshToken === "string")
  ) {
    return res.send(
      getErrorResult("NOT_ENOUGH_HEADER_DATA", "Need access, refresh token")
    );
  }

  //

  const { User, Token } = sequelize.models;

  try {
    //Refresh Token Check
    const refreshTokenRow = await Token.findOne({
      where: { refreshToken },
      include: [{ model: User, attributes: ["userId", "uuid"] }],
    });

    const storedRefreshToken = refreshTokenRow?.dataValues.refreshToken;
    const userId = refreshTokenRow!;
    console.log(userId);
    //Not Exists Refresh Token or Invalid Refresh Token
    if (!refreshTokenRow || storedRefreshToken !== refreshToken) {
      //Re login
      console.log("여기서 걸리나 1");
      return res.send(getErrorResult("NO_AUTH", "Need login"));
    }

    //refreshToken Verify
    const resultRefreshTokenVerify = refreshVerify(refreshToken);
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload & {
      userId: string;
    };
    // || userId !== decoded.userId
    if (!resultRefreshTokenVerify) {
      //Re login
      console.log("여기서 걸리나 2");
      console.log(decoded.userId);
      console.log(userId);
      return res.send(getErrorResult("NO_AUTH", "Need login"));
    }

    //Access Token Verify
    const resultAccessTokenVerify = verify(accessToken);
    if (resultAccessTokenVerify) {
      return res.send(
        getErrorResult("NOT_EXPIRED", "Access token still valid")
      );
    }

    const newAccessToken = sign({ userId: userId });
    return res.send(
      getSuccessResult(200, "Access Token Renewal", {
        accessToken: newAccessToken,
        refreshToken,
        tokenExpiredsIn: process.env.JWT_EXPIRES_IN,
      })
    );
  } catch (e) {
    console.error(e);
    res.send(getErrorResult("TOKEN_ISSUE"));
  }
  //
};
