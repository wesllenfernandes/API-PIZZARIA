"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

console.log('DB_USER:', process.env.DB_USER);

var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

const PORT = process.env.PORT || 3001;
_appjs2.default.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
