import express from "express";
import routes from "../../routes";

import { renewalToken } from "../../controllers/token/tokenController";

const router = express.Router();

router.get(routes.renewal, renewalToken);

export default router;
