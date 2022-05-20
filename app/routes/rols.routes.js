module.exports = (app) => {
  const rols = require("../controllers/rols.controller");

  const passport = require("passport");

  let router = require("express").Router();

  const auth = passport.authenticate("bearer", { session: false });

  router.get("/getAll", rols.findAll);

  app.use("/api/rols", auth, router);
};
