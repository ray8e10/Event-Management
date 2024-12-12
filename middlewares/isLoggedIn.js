function isLoggedIn(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  if (req.xhr || req.headers["x-requested-with"] === "XMLHttpRequest") {
    return res
      .status(401)
      .json({ error: "You must be logged in to perform this action." });
  }
  res
    .status(401)
    .send({ message: "You must be logged in to access this resource" });
}

module.exports = isLoggedIn;
