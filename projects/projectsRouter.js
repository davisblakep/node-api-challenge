const express = require("express");
const router = express.Router();
const projects = require("../data/helpers/projectModel");
const {
  validateProjectPost,
  validateProjectId,
  validateProjectPut,
} = require("../middleware/project");

router.get("/api/projects", (req, res) => {
  projects
    .get()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/api/projects/:id", validateProjectId(), (req, res) => {
  projects
    .get(req.params.id)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/api/projects/", validateProjectPost(), (req, res, next) => {
  projects
    .insert({
      name: req.body.name,
      description: req.body.description,
      completed: false,
    })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.put(
  "/api/projects/:id",
  validateProjectId(),
  validateProjectPut(),
  (req, res, next) => {
    projects
      .update(req.params.id, req.body)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.delete("/api/projects/:id", validateProjectId(), (req, res, next) => {
  projects
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The project has been deleted.",
        });
      } else {
        res.status(404).json({
          message: "The project could not be found",
        });
      }
    })
    .catch(next);
});

module.exports = router;
