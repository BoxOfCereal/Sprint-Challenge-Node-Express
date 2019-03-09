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
    const project = await db.get(id);
    if (project) res.status(200).json(project);
    else res.status(404).json({ error: "project Does Not Exist" });
  } catch (e) {
    res.status(500).json({ error: "Could Not Get project" });
  }
});

router.put("/:id", async ({ body: project, params: { id } }, res) => {
  const { description, name, completed } = project;
  try {
    if (!description || !name || completed === undefined) {
      res.status(400).json({
        errorMessage:
          "Please provide a description, name, and completed status for project."
      });
    } else {
      //returns number of projects updated
      const updated = await db.update(id, project);
      if (!updated) {
        res.status(500).json({ error: "Could Not Update The project" });
      } else {
        const project = await db.get(id);
        res.status(201).json(project);
      }
    }
  } catch (e) {
    res.status(500).json({ error: "Could Not Update the project" });
  }
});

module.exports = router;
