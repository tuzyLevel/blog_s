import { Request, Response } from "express";

import { S3Client } from "@aws-sdk/client-s3";

import { getErrorResult, getSuccessResult } from "../../utils/messages";

import sequelize from "../../models/index";
import { Sequelize } from "sequelize";

export const writePosting = async (req: Request, res: Response) => {
  //board, title, content
  const { board, title, content } = req.body;

  //check input
  if (!board || !title || !content) {
    return res.send(
      getErrorResult("NO_INPUT_DATA", "Not enough essential data")
    );
  }

  const { first, second } = board;

  try {
    const Board = sequelize.models.Board;
    const boardRecord = await Board.findOne({
      where: { id: first.id, name: first.name },
      include: [
        {
          model: Board,
          as: "ChildEntity",
          required: true,
          where: { id: second.id, name: second.name },
        },
      ],
    });

    if (!boardRecord) throw new Error();
  } catch (e) {
    console.error(e);
    return res.send(getErrorResult("FAILED_FIND_DATA", "Can not find board"));
  }

  const t = await sequelize.transaction();
  try {
    const Posting = sequelize.models.Posting;

    const currentOrder = await Posting.max("order");
    const order = currentOrder ? (currentOrder as number) + 1 : 1;

    await Posting.create({
      title,
      content,
      order,
      boardId: second.id,
    });

    const Board = sequelize.models.Board;
    const boardRecord = await Board.findOne({ where: { id: second.id } });
    const count = boardRecord!.dataValues.count + 1;

    await Board.update({ count }, { where: { id: second.id } });

    res.send(getSuccessResult(200, "Success create posting"));
    await t.commit();
  } catch (e) {
    console.error(e);
    return res.send(getErrorResult("FAILED_CREATE", "Failed write posting"));
  }
};

export const readPostingList = async (req: Request, res: Response) => {
  const { boardId: stringBoardId } = req.params;
  const boardId = parseInt(stringBoardId);
  if (!boardId || isNaN(boardId)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "need board id"));
  }

  try {
    const Posting = sequelize.models.Posting;
    const postingRecord = await Posting.findAll({ where: { boardId } });
    res.send(getSuccessResult(200, "posting list by boardId", postingRecord));
  } catch (e) {
    console.error(e);
    return res.send(
      getErrorResult("FAILED_FIND_DATA", "can not read posting list")
    );
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

export const modifyPosting = (req: Request, res: Response) => {
  const { id: stringId } = req.params;
};

export const deletePosting = async (req: Request, res: Response) => {
  let { id: stringId } = req.params;
  const id = parseInt(stringId);
  if (!stringId || isNaN(id)) {
    return res.send(getErrorResult("NO_INPUT_DATA", "Need number posting id"));
  }

  const t = await sequelize.transaction();
  try {
    const Posting = sequelize.models.Posting;

    const postingRecord = await Posting.findOne({ where: { id } });
    console.log(postingRecord);
    if (!postingRecord) {
      return res.send(getErrorResult("NOT_FOUND", "Not exists posting data"));
    }

    const DPosting = sequelize.models.D_Posting;
    await DPosting.create({
      ...postingRecord.dataValues,
      updatedAt: Sequelize.fn("NOW"),
    });
    await Posting.destroy({ where: { id } });
    await t.commit();
    res.send(getSuccessResult(200, "Posting delete succeeded"));
  } catch (e) {
    console.error(e);
    await t.rollback();
    return res.send(getErrorResult("FAILED_DELETE_DATA"));
  }
};

//For SunEditor
export const upload = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(500).send({ errorMessage: "insert error message" });
    return;
  }

  const file = req.file as Express.MulterS3.File;

  res.send({
    result: [{ url: file.location, name: file.originalname, size: file.size }],
  });
};
