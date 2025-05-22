"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _databasejs = require('./config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

class app {
  constructor() {
    this.server = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
    this.database();
  }
  database() {
    _databasejs2.default.sync()
      .then(() => console.log("Banco sincronizado"))
      .catch((err) => console.error("Erro ao conectar no banco:", err));
  }
middlewares() {
    this.server.use(_express2.default.json());
  }
    routes() {
    this.server.use(_routes2.default);
  }
}
exports. default = new app().server;