const Sequelize = require("sequelize");
const sequelize = require("./baza.js");


module.exports = function (sequelize, DataTypes) {
    const Zadaci = sequelize.define('Zadaci', {
       naziv: Sequelize.STRING,
       opis: Sequelize.STRING,
       
       rok:Sequelize.DATE,
       prioritet:Sequelize.STRING,
       status:Sequelize.STRING
   }, {
        tableName: 'zadaci',
        freezeTableName: true
    });

    return Zadaci;
}
