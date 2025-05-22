"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const Administrador = _databasejs2.default.define("Administrador", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: _sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: "Administradores",
  timestamps: false,
  hooks: {
    beforeCreate: async (administrador) => {
      administrador.senha = await _bcryptjs2.default.hash(administrador.senha, 10);
    },
    beforeUpdate: async (administrador) => {
      if (administrador.changed("senha")) {
        administrador.senha = await _bcryptjs2.default.hash(administrador.senha, 10);
      }
    }
  }
});

exports. default = Administrador;
