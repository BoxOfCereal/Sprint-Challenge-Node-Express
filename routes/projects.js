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

router.post("/", async (req, res) => {
  const { description, name, completed } = req.body;
  try {
    if (!description || !name || completed === undefined) {
      res.status(400).json({
        error:
          "Please provide a description, name, and completed status for project."
      });
    } else {
      const project = await db.insert(req.body);
      res.status(201).json(project);
    }
  } catch (e) {
    res.status(500).json({ error: "Could Not Create the Project" });
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
