import express from "express";

import { getEmployees } from "./users.controller";

const router = express.Router();



router.get("/users100", getEmployees);

// router.get("/users100", (req, res) => {
//     res.status(200).json({
//       message: "Users endpoint works",
//     });
//   });

export default router;