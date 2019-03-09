const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (e) {
    res
      .status(500)
      .json({ error: "The projects information could not be retrieved." });
  }
});

module.exports = router;
