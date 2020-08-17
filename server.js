const express = require("express");
const actionsRouter = require("./actions/actionsRouter");
const projectsRouter = require("./projects/projectsRouter");

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(actionsRouter);
server.use(projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to the Sprint API</h2>`);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
