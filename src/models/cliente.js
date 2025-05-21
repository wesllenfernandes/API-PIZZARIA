import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const Cliente = sequelize.define("Cliente", {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "Clientes",
  timestamps: false,
  hooks: {
    beforeCreate: async (cliente) => {
      cliente.senha = await bcrypt.hash(cliente.senha, 10);
    },
    beforeUpdate: async (cliente) => {
      if (cliente.changed("senha")) {
        cliente.senha = await bcrypt.hash(cliente.senha, 10);
      }
    }
  }
});

export default Cliente;
