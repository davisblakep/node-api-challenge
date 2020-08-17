const actions = require("../data/helpers/actionModel");

function validateActionPost() {
  return (req, res, next) => {
    if (!req.body.description || !req.body.notes) {
      return res.status(400).json({
        message: "Missing required description or notes field",
      });
    }
    next();
  };
}

function validateActionPut() {
  return (req, res, next) => {
    if (!req.body.description || !req.body.notes || !req.body.completed) {
      return res.status(400).json({
        message: "Missing required description, notes, or completed field",
      });
    }
    next();
  };
}

function validateActionId() {
  return (req, res, next) => {
    actions
      .get(req.params.id)
      .then((action) => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({
            message: "Invalid action ID",
          });
        }
      })
      .catch(next);
  };
}

module.exports = { validateActionPost, validateActionId, validateActionPut };
