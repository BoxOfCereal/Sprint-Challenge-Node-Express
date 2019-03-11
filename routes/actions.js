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
    res.status(500).json({ error: "Could Not Create the Action" });
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

router.put("/:id", async ({ body: action, params: { id } }, res) => {
  const { description, notes, completed, project_id } = action;
  try {
    if (!description || !notes || completed === undefined || !project_id) {
      res.status(400).json({
        errorMessage:
          "Please provide a description, notes, and completed status for action."
      });
    } else {
      //returns number of actions updated
      const updated = await db.update(id, action);
      if (!updated) {
        res.status(500).json({ error: "Could Not Update The Action" });
      } else {
        const action = await db.get(id);
        res.status(201).json(action);
      }
    }
  } catch (e) {
    res.status(500).json({ error: "Could Not Update the Action" });
  }
});

router.delete("/:id", async ({ params: { id } }, res) => {
  try {
    const count = await db.remove(id);
    if (count) res.status(200).json({ message: "Action Delete" });
    else res.status(404).json({ error: "Cannot Delete Nonexistent Action" });
  } catch (e) {
    res.status(500).json({ error: "Could Not Delete Action" });
  }
});

module.exports = router;
