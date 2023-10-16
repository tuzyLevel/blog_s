import express from "express";

import routes from "../../routes";

import { checkAccessToken } from "../../middlewares/authCheck";

import { loginTestFn } from "../../controllers/test/testController";

const router = express.Router();

router.post(routes.loginTest, loginTestFn);

export default router;
