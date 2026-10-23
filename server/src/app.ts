// server/src/app.ts
// ======================================
// app.ts - Configure Express
// ======================================

import express from "express";
import cors from "cors";

import apiRoutes from "./routes";
import notFoundMiddleware from "./middleware/not-found.middleware";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api", apiRoutes);

// Error handling — keep these last
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;