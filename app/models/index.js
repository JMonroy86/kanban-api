const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 4001,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.model")(sequelize, Sequelize);
db.rols = require("./rols.model")(sequelize, Sequelize);
db.tickets = require("./tickets.model")(sequelize, Sequelize);
db.statu = require("./status.model")(sequelize, Sequelize);

// Relationships

db.users.belongsTo(db.rols, {
  ForeignKey: "RolId",
  as: "rols",
});
db.tickets.belongsTo(db.users, {
  ForeignKey: "creatorEmail",
  as: "creator",
});
db.tickets.belongsTo(db.users, {
  ForeignKey: "assignedEmail",
  as: "assigned",
});
db.tickets.belongsTo(db.statu, {
  ForeignKey: "statusId",
  as: "status",
});

module.exports = db;