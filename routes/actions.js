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

router.post("/", async (req, res) => {
  const { description, notes, completed, project_id } = req.body;
  try {
    if (!description || !notes || completed === undefined || !project_id) {
      res.status(400).json({
        error:
          "Please provide a description, notes, and completed status for action."
      });
    } else {
      const action = await db.insert(req.body);
      res.status(201).json(action);
    }
  } catch (e) {
    res.status(500).json({ error: "Could Not Create the User" });
  }
});

router.get("/:id", async ({ params: { id } }, res) => {
  try {
    const action = await db.get(id);
    if (action) res.status(200).json(action);
    else res.status(404).json({ error: "Action Does Not Exist" });
  } catch (e) {
    res.status(500).json({ error: "Could Not Get Action" });
  }
});

module.exports = router;
