const Sequelize = require("sequelize");
const sequelize = new Sequelize("zadaci", "root", "", {
   host: "localhost",
   dialect: "mysql"
});
module.exports = sequelize;

