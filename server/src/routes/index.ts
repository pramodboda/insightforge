// import express from "express";
import { Router } from "express";

import userRoutes from "../features/users/users.routes";
// import employeesRoutes from "../features/employees/employees.routes";

// const router = express.Router();

const router = Router();

router.use("/users100", userRoutes);
// router.use("/employees", employeesRoutes);

export default router;