module.exports = (app) => {
  const tickets = require("../controllers/ticket.controller");

  const passport = require("passport");

  let router = require("express").Router();

  const auth = passport.authenticate("bearer", { session: false });

  
  router.delete("/:id", tickets.deleteOne);
  router.put("/:id", tickets.update);
  router.get("/:id", tickets.findOne);
  router.get("/getOne/:id", tickets.findById);
  router.post("/", tickets.create);
  router.get("/", tickets.findAll);
  
  app.use("/api/tickets", auth, router);
};
