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

export const readBoard = async (req: Request, res: Response) => {};

export const updateBoard = async (req: Request, res: Response) => {
  const { id: stringId } = req.params;
  const { name } = req.body;
  const id = parseInt(stringId);
  if (!name || !stringId || isNaN(id)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "Need board id, name"));
  }
  console.log(name);
  const t = await sequelize.transaction();
  try {
    const { Board } = sequelize.models;

    const boardRecord = await Board.findOne({ where: { id } });

    if (!boardRecord) {
      return res.send(getErrorResult("FAILED_FIND_DATA", "Not exists board"));
    }

    await Board.update({ name }, { where: { id } });
    await t.commit();
    res.send(getSuccessResult(200, "board update success"));
  } catch (e) {
    console.error(e);
    return res.send(
      getErrorResult("FAILED_DELETE_DATA", "Can not delete board")
    );
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  if (!stringId || isNaN(id)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "Need board id"));
  }
  const t = await sequelize.transaction();
  try {
    const { Board, Posting } = sequelize.models;

    const postingRecord = await Posting.findAll({ where: { boardId: id } });
    if (postingRecord.length > 0) {
      return res.send(
        getErrorResult("FAILED_DELETE_DATA_REMAIN_POSTING", "remain posting")
      );
    }

    const boardRecord = await Board.findAll({ where: { parentId: id } });
    console.log(boardRecord);
    if (boardRecord.length > 0) {
      return res.send(
        getErrorResult(
          "FAILED_DELETE_DATA_REMAIN_CHILD_BOARD",
          "remain child board"
        )
      );
    }

    await Board.destroy({ where: { id } });
    await t.commit();
    res.send(getSuccessResult(200, "board delete success"));
  } catch (e) {
    console.error(e);
    return res.send(
      getErrorResult("FAILED_DELETE_DATA", "Can not delete board")
    );
  }
};

export const createBoard = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { name, parentId = 0 } = data;
  if (!data || !name) return res.send(getErrorResult("NO_INPUT_DATA"));

  try {
    const Board = sequelize.models.Board;

    //Check Existence
    const boardRecord = await Board.findOne({ where: { name, parentId } });
    if (boardRecord !== null) {
      return res.send(
        getErrorResult("ALREADY_EXIST", "Already exists board name")
      );
    }

    //Check Parent Board Exists
    if (parentId !== 0) {
      const parentRecord = await Board.findOne({ where: { id: parentId } });
      if (!parentRecord) {
        return res.send(
          getErrorResult("FAILED_CREATE", "Can't find parent board")
        );
      }
    }

    //Find order
    const maxOrder = await Board.max("order", { where: { parentId } });
    const order = maxOrder ? (maxOrder as number) + 1 : 1;

    await Board.create({
      name,
      parentId,
      order,
    });
    res.send(getSuccessResult(200, "CREATE_SUCCESS"));
  } catch (e) {
    console.error(e);
    return res.send(getErrorResult("FAILED_CREATE", "Board does not created"));
  }
};
