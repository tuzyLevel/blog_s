import express from "express";

import routes from "../../../routes";

import { insertAdminInfo } from "../../../controllers/admin/registController";

const router = express.Router();

router.post(routes.registAdminInfo, insertAdminInfo);

export default router;
