const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (e) {
    res
      .status(500)
      .json({ error: "The actions information could not be retrieved." });
  }
});

module.exports = router;
