const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: dbConfig.dialect,
  port: 3306,
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
  ForeignKey: "creatorId",
  as: "creator",
});
db.tickets.belongsTo(db.users, {
  ForeignKey: "assignedId",
  as: "assigned",
});
db.tickets.belongsTo(db.statu, {
  ForeignKey: "statusId",
  as: "status",
});

module.exports = db;