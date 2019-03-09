const express = require("express");
const server = express();
const helmet = require("helmet");
server.use(express.json());
server.use(helmet());

const actionsRoutes = require("./routes/actions");
server.use("/api/actions", actionsRoutes);

const projectsRoutes = require("./routes/projects");
server.use("/api/projects", projectsRoutes);

module.exports = server;
