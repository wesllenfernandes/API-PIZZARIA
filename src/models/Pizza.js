const { DataTypes } = require("sequelize");
import sequelize from '../config/database.js';
 

const Pizza = sequelize.define("Pizza", {
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

export default Pizza;
