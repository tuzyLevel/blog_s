import express from "express";
import routes from "../../routes";

import postingRouter from "../client/posting";
import boardRouter from "../client/board";

const router = express.Router();

router.use(routes.clientPosting, postingRouter);
router.use(routes.clientBoard, boardRouter);

export default router;
