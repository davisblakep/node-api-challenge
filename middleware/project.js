const projects = require("../data/helpers/projectModel");

function validateProjectPost() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        message: "Missing required name or description field",
      });
    }
    next();
  };
}

function validateProjectId() {
  return (req, res, next) => {
    projects
      .get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({
            message: "Invalid project ID",
          });
        }
      })
      .catch(next);
  };
}

module.exports = { validateProjectPost, validateProjectId };
