const Sequelize = require("sequelize");
const sequelize = new Sequelize("zadaci", "root", "password", {
   host: "localhost",
   dialect: "mysql"
});
module.exports = sequelize;

