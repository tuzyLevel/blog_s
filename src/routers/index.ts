import express from "express";
import routes from "../routes";

import userRouter from "./user";
import adminRouter from "./admin";
import clientRouter from "./client";
import tokenRouter from "./token";
import testRouter from "./test";

const router = express.Router();

router.use(routes.user, userRouter);
router.use(routes.admin, adminRouter);
router.use(routes.client, clientRouter);
router.use(routes.token, tokenRouter);
router.use(routes.test, testRouter);

export default router;
