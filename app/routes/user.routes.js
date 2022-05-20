module.exports = (app) => {
  const users = require("../controllers/users.controller");

  const passport = require("passport");

  let router = require("express").Router();

  const auth = passport.authenticate("bearer", { session: false });

  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/devs", users.findAllDev);
  router.get("/admin", users.findAdmin);
  router.get("/filter/:id", users.filterOne);
  router.put("/:id", users.update);
  router.get("/:id", users.findOne);
  router.delete("/:id", users.deleteOne);

  app.use("/api/users", auth, router);
};
