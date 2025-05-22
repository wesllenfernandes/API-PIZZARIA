"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const { DataTypes } = require("sequelize");
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
 

const Pizza = _databasejs2.default.define("Pizza", {
  id_pizza: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tamanho: {
    type: DataTypes.ENUM('Pequena', 'Média', 'Grande'),
    allowNull: false
  },
  preco_base: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  tableName: "Pizzas", // Define o nome exato da tabela no MySQL
  timestamps: false // Desativa createdAt e updatedAt, pois já existem no banco
});

exports. default = Pizza;
