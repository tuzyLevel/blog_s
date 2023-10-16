import express from "express";

import routes from "../../routes";

import registRouter from "./regist";
import postingRouter from "./posting";

import boardRouter from "./board";

const router = express.Router();

router.use(routes.regist, registRouter);

router.use(routes.posting, postingRouter);

router.use(routes.board, boardRouter);

export default router;
