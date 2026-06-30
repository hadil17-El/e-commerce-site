import express from "express";
import db from "../db.js";
import auth from "../middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { id,
          latest,
          recommended,
          user_id, 
          gender, 
          category, 
          sale, 
          search } = req.query;

  try {
    if (id) {
      const {rows} = await db.query("SELECT * FROM products WHERE id = $1", [id]);
      return res.json(rows[0] || null);
    }
    if (latest) {
      const {rows} = await db.query("SELECT * FROM products ORDER BY id DESC LIMIT 10");
      return res.json(rows);
    }
if (recommended && user_id) {
  const { rows: cats } = await db.query(
    `SELECT DISTINCT p.category
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = $1`,
    [user_id]
  );

  const categories = cats.map(r => r.category).filter(Boolean);

  if (categories.length === 0) return res.json([]);

  const placeholders = categories.map((_, i) => `$${i + 1}`).join(",");

  const query = `
    SELECT *
    FROM products
    WHERE category IN (${placeholders})
    AND id NOT IN (
      SELECT product_id FROM cart WHERE user_id = $${categories.length + 1}
    )
    LIMIT 10
  `;

  const { rows } = await db.query(query, [...categories, user_id]);

  return res.json(rows);
}
    if (gender) {
      const {rows} = await db.query("SELECT * FROM products WHERE gender = $1", [gender]);
      return res.json(rows);
    }
    if (category) {
      const {rows} = await db.query("SELECT * FROM products WHERE category = $1", [category]);
      return res.json(rows);
    }
    if (sale !== undefined) {
      const {rows} = await db.query("SELECT * FROM products WHERE price <= 40 ORDER BY price ASC");
      return res.json(rows);
    }
    if (search) {
      const like = `%${search}%`;
      const {rows} = await db.query("SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $2", [like, like]);
      return res.json(rows);
    }
    const {rows} = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (e) {
    console.log("ERRORE:", e);
    res.status(500).json({ error: "Errore server" });
  }
});

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Accesso negato" });
  const { name, price, image, description, category,gender,sale,discount_price,stock } = req.body;
  if (!name || price == null) return res.status(400).json({ error: "Nome e prezzo obbligatori" });
  try {
    const { rows } = await db.query(
  `INSERT INTO products
   (name, price, image, description, category,gender,sale,discount_price,stock)
   VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)
   RETURNING id`,
  [name, price, image, description, category,gender || "unisex",sale || false,discount_price || null,stock || 0,]
);
    res.json({ message: "Prodotto aggiunto", id:rows[0].id });
  } catch {
    console.error("POST /products: ",err)
    res.status(500).json({ error: "Errore server" });
  }
});

router.put("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Non autorizzato" });
  const { id, name, price, image, description, category,gender,sale,discount_price,stock} = req.body;
  try {
    await db.query(
      "UPDATE products SET name=$1, price=$2, image=$3, description=$4, category=$5,gender=$6,sale=$7,discount_price=$8,stock=$9 WHERE id=$10",
      [name, price, image, description, category,gender,sale,discount_price, stock , id]
    );
    res.json({ message: "Prodotto aggiornato" });
  } catch  {
    console.error("PUT /products: ",err)
    res.status(500).json({ error: "Errore server" });
  }
});

router.delete("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Non autorizzato" });
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "ID mancante" });
  try {
    const result = await db.query("DELETE FROM products WHERE id = $1", [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Prodotto non trovato" });
    res.json({ message: "Prodotto eliminato" });
  }  catch (e) {
    console.log("DELETE /products: ", e);
    res.status(500).json({ error: "Errore server" });
}
});

export default router;