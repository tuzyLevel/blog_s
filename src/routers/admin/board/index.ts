import express from "express";

import routes from "../../../routes";

import { checkAccessToken } from "../../../middlewares/authCheck";

import {
  readBoardList,
  createBoard,
  readBoard,
  updateBoard,
  deleteBoard,
} from "../../../controllers/admin/boardController";

const router = express.Router();

router.get(routes.readBoardList, checkAccessToken, readBoardList);

router.get(routes.readBoard, checkAccessToken, readBoard);

router.post(routes.createBoard, checkAccessToken, createBoard);

router.patch(routes.updateBoard, checkAccessToken, updateBoard);

router.delete(routes.deleteBoard, checkAccessToken, deleteBoard);

export default router;
