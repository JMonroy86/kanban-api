"use strict";

module.exports = (app) => {
  require("./auth.routes")(app);
  require("./user.routes")(app);
  require("./rols.routes")(app);
  require("./tickets.routes")(app);
  require("./status.routes")(app);
};
