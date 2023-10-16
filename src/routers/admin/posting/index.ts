import express from "express";

import routes from "../../../routes";

import { checkAccessToken } from "../../../middlewares/authCheck";

import {
  writePosting,
  readPosting,
  modifyPosting,
  deletePosting,
  readPostingList,
  upload,
} from "../../../controllers/admin/postingController";

import uploadMW from "../../../middlewares/uploadFileToS3";

const router = express.Router();

router.get(routes.readPosting, checkAccessToken, readPosting);

router.post(routes.writePosting, checkAccessToken, writePosting);

router.patch(routes.modifyPosting, checkAccessToken, modifyPosting);

router.delete(routes.deletePosting, checkAccessToken, deletePosting);

router.get(routes.postingList, checkAccessToken, readPostingList);

router.post(routes.upload, uploadMW.single("file-0"), upload);

export default router;
