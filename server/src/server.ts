// server/src/server.ts
// ======================================
// server.ts - Start listening
// ======================================

// =====================================================================
// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import employeeRoutes from "./routes/employee.routes";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/api/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// app.use("/api/employees", employeeRoutes);

// const port = Number(process.env.PORT) || 3001;

// app.listen(port, () => {
//   console.log(`API running on port ${port}`);
// });

// =====================================================================

import "dotenv/config";
import app from "./app";

const port = Number(process.env.PORT) || 3001;

const startServer = app.listen(port, "0.0.0.0", () => {
  console.log("===========================");
  console.log(`API running on port ${port}`);
  console.log("===========================");
});

export default startServer;