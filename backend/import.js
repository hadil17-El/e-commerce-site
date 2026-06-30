import "dotenv/config";
import pkg from "pg"
import fs from "fs";

const {Pool}=pkg
const sql = fs.readFileSync("./ecommerce_solo.sql", "utf8");

const pool = new Pool({
  conncetionString:process.env.DATABASE_URL,
  ssl:{rejectUnauthorized:false}
})
try{
  await pool.query(sql)
  console.log("Import completato con successo!")
} catch (e){
  console.error("Error import:",e)
} finally{
  await pool.end()
}


