module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  const router = require("express").Router();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/signUp", auth.signUp);
  router.post("/signIn", auth.signIn);

  app.use("/api/auth", router);
};
