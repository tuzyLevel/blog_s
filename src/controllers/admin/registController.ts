import { Request, Response } from "express";
import { v4 } from "uuid";

import sequelize from "../../models";

import { getPasswordForValidation } from "../../utils";

import { getErrorResult, getSuccessResult } from "../../utils/messages";

export const insertAdminInfo = async (req: Request, res: Response) => {
  const { userId, password } = req.body.registData;
  const salt = process.env.ADMIN_SALT || "salt";
  const encryptedPassword = getPasswordForValidation(password, salt);
  const uid = v4().toString().replace("-", "");

  const User = sequelize.models.User;
  try {
    const userRecord = await User.findOne({ where: { userId } });
    if (userRecord !== null) {
      return res.send(getErrorResult("ALREADY_EXIST", "Already Exsits UserId"));
    }

    //Insert Data into Table
    await User.create({
      uuid: uid,
      userId: userId,
      password: encryptedPassword,
    });

    res.send(getSuccessResult(200, "REGIST_SUCCESS"));
  } catch (e) {
    console.error(e);

    res.status(200).send(getErrorResult("FAILED_INSERT_DATA"));
  }
};
