import express from "express";

import routes from "../../../routes";

import {
  getPostingListByBoardId,
  readPosting,
} from "../../../controllers/client/postingController";

const router = express.Router();

router.get(routes.readPosting, readPosting);

router.get(routes.clientGetPostingListByBoardId, getPostingListByBoardId);

export default router;
