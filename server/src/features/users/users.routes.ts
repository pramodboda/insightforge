import express from "express";

import { getEmployees100 } from "./users.controller";

const router = express.Router();



router.get("/users100", getEmployees100);

// router.get("/users100", (req, res) => {
//     res.status(200).json({
//       message: "Users endpoint works",
//     });
//   });

export default router;