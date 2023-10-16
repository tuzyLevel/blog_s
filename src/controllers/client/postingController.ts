import { Request, Response } from "express";

import { getErrorResult, getSuccessResult } from "../../utils/messages";

import sequelize from "../../models/index";

export const getPostingListByBoardId = async (req: Request, res: Response) => {
  const { boardId: stringId } = req.params;
  const { count: stringCount } = req.query;

  const boardId = parseInt(stringId);
  const count = parseInt(stringId);
  if (!stringId || isNaN(boardId)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "Need number board id"));
  }
  if (!count || isNaN(count)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "Need number count"));
  }

  try {
    const Posting = sequelize.models.Posting;

    const postingRecord = await Posting.findAll({
      where: { boardId },
      order: [["order", "DESC"]],
    });

    if (!postingRecord) {
      return res.send(getErrorResult("NOT_FOUND", "Not exists posting"));
    }

    return res.send(
      getSuccessResult(200, "success read posting", postingRecord)
    );
  } catch (e) {
    console.error(e);
    return res.send(getErrorResult("FAILED_FIND_DATA", "Failed read posting"));
  }
};
export const readPosting = async (req: Request, res: Response) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  if (!stringId || isNaN(id)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "Need number posting id"));
  }

  try {
    const Posting = sequelize.models.Posting;

    const postingRecord = await Posting.findOne({ where: { id } });

    if (!postingRecord) {
      return res.send(getErrorResult("NOT_FOUND", "Not exists posting"));
    }

    return res.send(
      getSuccessResult(200, "success read posting", postingRecord)
    );
  } catch (e) {
    console.error(e);
    return res.send(getErrorResult("FAILED_FIND_DATA", "Failed read posting"));
  }
};
