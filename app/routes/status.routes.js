module.exports = (app) => {
  const status = require("../controllers/status.controller");

  const passport = require("passport");

  let router = require("express").Router();

  const auth = passport.authenticate("bearer", { session: false });

  router.get("/getAll", status.findAll);

  app.use("/api/status", auth, router);
};
