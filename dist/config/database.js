"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();


var _sequelize = require('sequelize');


/*const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT),
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  }
);
*/
const sequelize = new (0, _sequelize.Sequelize)('railway', 'root', 'QAlsHTOLiWTsPtzcwBlipbxSgrvzhaoI', {
  host: 'yamanote.proxy.rlwy.net',
  dialect: 'mysql',
  port: 	35851,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
});
/*
const sequelize = new Sequelize('pizzalab', 'root', 'QAlsHTOLiWTsPtzcwBlipbxSgrvzhaoI', {
  host: 'mysql.railway.internal',
  //dialect: 'mysql',
  port: 3306,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
});*/

sequelize.authenticate()
  .then(() => console.log("✅ Conectado ao banco de dados com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));

exports. default = sequelize;
//module.exports = sequelize;