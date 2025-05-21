import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const Administrador = sequelize.define("Administrador", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: "Administradores",
  timestamps: false,
  hooks: {
    beforeCreate: async (administrador) => {
      administrador.senha = await bcrypt.hash(administrador.senha, 10);
    },
    beforeUpdate: async (administrador) => {
      if (administrador.changed("senha")) {
        administrador.senha = await bcrypt.hash(administrador.senha, 10);
      }
    }
  }
});

export default Administrador;
