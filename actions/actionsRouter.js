const express = require("express");
const router = express.Router();
const actions = require("../data/helpers/actionModel");
const {
  validateActionPost,
  validateActionId,
} = require("../middleware/action");

router.get("/api/actions", (req, res) => {
  actions
    .get()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/api/actions/:id", validateActionId(), (req, res) => {
  actions
    .get(req.params.id)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      next(error);
    });
});

router.post(
  "/api/projects/:id/actions",
  validateActionPost(),
  (req, res, next) => {
    actions
      .insert({
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes,
        completed: false,
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.put(
  "/api/actions/:id",
  validateActionId(),
  validateActionPost(),
  (req, res, next) => {
    actions
      .update(req.params.id, req.body)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.delete("/api/actions/:id", validateActionId(), (req, res, next) => {
  actions
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The action has been deleted.",
        });
      } else {
        res.status(404).json({
          message: "The action could not be found",
        });
      }
    })
    .catch(next);
});

module.exports = router;
