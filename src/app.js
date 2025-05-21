import express  from "express";
import routes from "./routes";
import sequelize from "./config/database.js";

class app {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }
  database() {
    sequelize.sync()
      .then(() => console.log("Banco sincronizado"))
      .catch((err) => console.error("Erro ao conectar no banco:", err));
  }
middlewares() {
    this.server.use(express.json());
  }
    routes() {
    this.server.use(routes);
  }
}
export default new app().server;