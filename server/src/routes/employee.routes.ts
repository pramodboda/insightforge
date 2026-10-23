import { Router } from "express";
import { pool } from "../config/db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees LIMIT 100"
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch employees:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch employees",
    });
  }
});

export default router;