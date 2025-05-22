import { Sequelize } from "sequelize";

const sequelize = new Sequelize('pizzalab', 'root', '2000', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
});

sequelize.authenticate()
  .then(() => console.log("✅ Conectado ao banco de dados com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));

export default sequelize;
