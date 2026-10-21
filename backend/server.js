
import db from "./src/config/db.js";

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 AS connected");
    console.log("MySQL connected successfully!", rows);
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  } finally {
    await db.end();
  }
}

testConnection();
