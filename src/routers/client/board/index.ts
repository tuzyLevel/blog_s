import express from "express";

import routes from "../../../routes";

import { readBoardList } from "../../../controllers/client/boardController";

const router = express.Router();

router.get(routes.clientBoardList, readBoardList);

export default router;
