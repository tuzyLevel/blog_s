import { Request, Response } from "express";
import { v4 } from "uuid";

import { Sequelize, Op } from "sequelize";

import sequelize from "../../models";

import { getErrorResult, getSuccessResult } from "../../utils/messages";

export const readBoardList = async (req: Request, res: Response) => {
  try {
    const Board = sequelize.models.Board;

    const boardRecord = await Board.findAll({
      attributes: ["id", "name", "parentId", "order", "count"],
      order: [
        ["parentId", "ASC"],
        ["order", "ASC"],
      ],
      where: { parentId: { [Op.not]: null } },
    });

    //TODO Change type
    const result: any = {};

    boardRecord.forEach((data) => {
      const target = data.dataValues;
      if (target.parentId === 0) {
        target.children = [];
        result[target.id] = target;
      } else {
        result[target.parentId].children.push(target);
      }
    });

    res.send(getSuccessResult(200, "Read board list", Object.values(result)));
  } catch (e) {
    console.error(e);
    return res.send(
      getErrorResult("FAILED_FIND_DATA", "Failed find board list")
    );
  }
};
