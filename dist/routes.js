"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _expressvalidator = require('express-validator');

var _sessionControllerjs = require('./app/controllers/sessionController.js'); var _sessionControllerjs2 = _interopRequireDefault(_sessionControllerjs);
var _CustomersControllerjs = require('./app/controllers/CustomersController.js'); var _CustomersControllerjs2 = _interopRequireDefault(_CustomersControllerjs);
var _ClientesControllerjs = require('./app/controllers/ClientesController.js'); var _ClientesControllerjs2 = _interopRequireDefault(_ClientesControllerjs);
var _PedidosControllerjs = require('./app/controllers/PedidosController.js'); var _PedidosControllerjs2 = _interopRequireDefault(_PedidosControllerjs);
var _administradorControllerjs = require('./app/controllers/administradorController.js'); var _administradorControllerjs2 = _interopRequireDefault(_administradorControllerjs);

var _sanitizeMiddlewarejs = require('./app/middlewares/sanitizeMiddleware.js'); var _sanitizeMiddlewarejs2 = _interopRequireDefault(_sanitizeMiddlewarejs);
var _authmiddlewarejs = require('./app/middlewares/authmiddleware.js'); var _authmiddlewarejs2 = _interopRequireDefault(_authmiddlewarejs);

const routes = new (0, _express.Router)();

const pizzaValidator = [
  _expressvalidator.check.call(void 0, 'nome').notEmpty().withMessage('O nome da pizza é obrigatório'),
  _expressvalidator.check.call(void 0, 'descricao').notEmpty().withMessage('A descrição não pode estar vazia'),
  _expressvalidator.check.call(void 0, 'tamanho').isIn(['Pequena', 'Média', 'Grande']).withMessage('O tamanho deve ser Pequena, Média ou Grande'),
  _expressvalidator.check.call(void 0, 'preco_base').isFloat({ gt: 0 }).withMessage('O preço base deve ser um número maior que zero')
];

const adminValidator = [
  _expressvalidator.check.call(void 0, 'nome').notEmpty().withMessage('Nome é obrigatório'),
  _expressvalidator.check.call(void 0, 'email').isEmail().withMessage('Email inválido'),
  _expressvalidator.check.call(void 0, 'senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
];

// Rotas públicas
routes.post("/register", _sessionControllerjs2.default.register);
routes.post("/login", _sessionControllerjs2.default.login);
routes.post("/admin/register", _sessionControllerjs2.default.registerAdmin);
routes.post("/admin/login", _sessionControllerjs2.default.loginAdmin);

// Rotas de pizzas
routes.get("/customers", _CustomersControllerjs2.default.index);
routes.get("/customers/:id", _CustomersControllerjs2.default.show);
routes.post("/customers", _sanitizeMiddlewarejs2.default, pizzaValidator, _CustomersControllerjs2.default.create);
routes.put("/customers/:id", _sanitizeMiddlewarejs2.default, pizzaValidator, _CustomersControllerjs2.default.update);
routes.delete("/customers/:id", _CustomersControllerjs2.default.destroy);

// Middleware de autenticação
routes.use(_authmiddlewarejs2.default);

// Rotas protegidas
routes.get('/clientes', _ClientesControllerjs2.default.index);
routes.get('/clientes/:id', _ClientesControllerjs2.default.show);
routes.post('/clientes', _ClientesControllerjs2.default.create);
routes.put('/clientes', _authmiddlewarejs2.default, _ClientesControllerjs2.default.update);
routes.delete('/clientes', _authmiddlewarejs2.default, _ClientesControllerjs2.default.destroy);

routes.get('/pedidos', _authmiddlewarejs2.default, _PedidosControllerjs2.default.index);
routes.get('/pedidos/:id', _PedidosControllerjs2.default.show);
routes.post('/pedidos', _authmiddlewarejs2.default, _PedidosControllerjs2.default.create);
routes.put('/pedidos/:id', _PedidosControllerjs2.default.update);
routes.delete('/pedidos/:id', _PedidosControllerjs2.default.destroy);


// Rotas protegidas de administradores
routes.get('/administradores', _administradorControllerjs2.default.index);
routes.get('/administradores/:id', _administradorControllerjs2.default.show);
routes.post('/administradores', adminValidator, _administradorControllerjs2.default.create);
routes.put('/administradores', adminValidator, _administradorControllerjs2.default.update);
routes.delete('/administradores', _administradorControllerjs2.default.destroy);

exports. default = routes;
