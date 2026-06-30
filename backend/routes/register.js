import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Dati mancanti" });
  }

  try {
    const {rows} = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "Email gia usata" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password, role) VALUES ($1, $2, 'customer')", [email, hashed]);

    res.json({ message: "Registrazione completata" });
  } catch  {
    res.status(500).json({ error: "Errore durante registrazione" });
  }
});

export default router;