import express from "express";

import userRoutes from "../features/users/users.routes";
// import employeesRoutes from "../features/employees/employees.routes";

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/employees", employeesRoutes);

export default router;