import express from "express";

import { fetchEmployees100 } from "./users.controller";

const router = express.Router();



router.get("/employees100", fetchEmployees100);