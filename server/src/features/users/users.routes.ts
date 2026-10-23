import express from "express";

import { getEmployees100 } from "./users.controller";

const router = express.Router();



router.get("/employees100", getEmployees100);

export default router;