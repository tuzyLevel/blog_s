import express from "express";

import routes from "../../routes";

import { login, logout } from "../../controllers/user/userController";

import { checkAccessToken } from "../../middlewares/authCheck";

const router = express.Router();

router.post(routes.login, login);

router.post(routes.logout, checkAccessToken, logout);

export default router;
