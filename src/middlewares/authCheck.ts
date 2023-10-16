import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { verify } from "../utils/jwt";

import sequelize from "../models";

import { getErrorResult } from "../utils/messages";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.send(getErrorResult("NO_AUTH"));
  }
  const accessToken = req.headers.authorization?.split(" ")[1] as string;

  const { User, Token } = sequelize.models;

  //Expired Access Token
  if (!verify(accessToken)) {
    // AccessToken Expired
    //// getRefreshToken
    // try {
    //   // const decoded = jwt.decode(accessToken) as jwt.JwtPayload;
    //   // const userId = decoded!.userId;

    //   // const refreshTokenRow = await Token.findOne({
    //   //   where: { userId },
    //   //   include: [{ model: User, attributes: ["uuid"] }],
    //   // });

    //   // if (!refreshTokenRow || !refreshTokenRow.dataValues.refresh_token) {
    //   //   res.status(400).send(getResultMsg(false, "Error: TOKEN EXPIRED"));
    //   //   return;
    //   // }
    //   // const refreshToken = refreshTokenRow.dataValues.refresh_token;
    //   // console.log(refreshToken);
    // } catch (e) {

    // }
    // return res.status(401).send(getErrorResult("INVALID_ACCESS_TOKEN"));
    return res.send(getErrorResult("INVALID_ACCESS_TOKEN"));
  }

  //Valid Access Token
  next();
};
