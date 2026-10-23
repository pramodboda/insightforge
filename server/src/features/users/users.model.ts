// import { pool } from "../../config/db";

import { sql } from "../../config/db";

export async function getEmployees() {
  const users = await sql`SELECT * FROM users LIMIT 100`;

  return users;
}

// export async function createEmployee(input: {
//   name: string;
//   email: string;
// }) {
//   const result = await pool.query(
//     `INSERT INTO users (name, email)
//      VALUES ($1, $2)
//      RETURNING id, name, email`,
//     [input.name, input.email]
//   );

//   return result.rows[0];
// }

