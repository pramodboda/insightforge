import { pool } from "../../config/db";


export async function getEmployees100(){
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
}

export async function createEmployee(input: {
  name: string;
  email: string;
}) {
  const result = await pool.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2)
     RETURNING id, name, email`,
    [input.name, input.email]
  );

  return result.rows[0];
}

