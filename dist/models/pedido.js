"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const { DataTypes } = require("sequelize");
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

const Pedido = _databasejs2.default.define("Pedido", {
  id_pedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clientes',
      key: 'id_cliente'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  id_pizza: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'Pizzas',
    key: 'id_pizza'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
},
  status: {
    type: DataTypes.ENUM( 'Pendente','Em preparo', 'No forno', 'Pronto para retirada'),
    defaultValue: 'Pendente'
  },
  data_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  forma_pagamento: {
    type: DataTypes.ENUM('Dinheiro', 'Cartão', 'Online'),
    allowNull: false
  },
  total_pedido: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
    prioridade: {
    type: DataTypes.ENUM('Baixa', 'Normal', 'Alta'),  // <-- Usando ENUM corretamente
    allowNull: false,
    defaultValue: 'Normal'
  },
 /* prioridade: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }*/
}, {
  tableName: "Pedidos",
  timestamps: false
});


exports. default = Pedido;
