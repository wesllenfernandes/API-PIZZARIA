"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const Cliente = _databasejs2.default.define("Cliente", {
  id_cliente: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: _sequelize.DataTypes.STRING(20),
    allowNull: true
  },
  senha: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  data_cadastro: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  }
}, {
  tableName: "Clientes",
  timestamps: false,
  hooks: {
    beforeCreate: async (cliente) => {
      cliente.senha = await _bcryptjs2.default.hash(cliente.senha, 10);
    },
    beforeUpdate: async (cliente) => {
      if (cliente.changed("senha")) {
        cliente.senha = await _bcryptjs2.default.hash(cliente.senha, 10);
      }
    }
  }
});

exports. default = Cliente;
