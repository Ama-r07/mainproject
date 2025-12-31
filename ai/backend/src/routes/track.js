const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/database");

const router = express.Router();

// CLICK TRACKING → show login page
router.get("/click", async (req, res) => {
  const { uid, cid } = req.query;

  if (!uid || !cid) {
    return res.status(400).send("Invalid link");
  }

  await pool.query(
    `INSERT INTO events VALUES ($1, $2, $3, $4, $5)`,
    [uuidv4(), uid, cid, "click", Date.now()]
  );

  res.sendFile(path.join(__dirname, "../pages/login.html"));
});

// FORM SUBMIT TRACKING
router.post("/submit", async (req, res) => {
  const { uid, cid } = req.body;

  await pool.query(
    `INSERT INTO events VALUES ($1, $2, $3, $4, $5)`,
    [uuidv4(), uid, cid, "submit", Date.now()]
  );

  res.send("This was a phishing awareness simulation. Thank you.");
});

module.exports = router;