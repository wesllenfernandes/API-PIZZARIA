import { Router } from "express";
import { check } from "express-validator";

import sessionController from './app/controllers/sessionController.js';
import CustomersController from "./app/controllers/CustomersController.js";
import ClientesController from './app/controllers/ClientesController.js';
import PedidosController from './app/controllers/PedidosController.js';
import administradorController from './app/controllers/administradorController.js';

import sanitizeMiddleware from "./app/middlewares/sanitizeMiddleware.js";
import authMiddleware from "./app/middlewares/authmiddleware.js";

const routes = new Router();

const pizzaValidator = [
  check('nome').notEmpty().withMessage('O nome da pizza é obrigatório'),
  check('descricao').notEmpty().withMessage('A descrição não pode estar vazia'),
  check('tamanho').isIn(['Pequena', 'Média', 'Grande']).withMessage('O tamanho deve ser Pequena, Média ou Grande'),
  check('preco_base').isFloat({ gt: 0 }).withMessage('O preço base deve ser um número maior que zero')
];

const adminValidator = [
  check('nome').notEmpty().withMessage('Nome é obrigatório'),
  check('email').isEmail().withMessage('Email inválido'),
  check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
];

// Rotas públicas
routes.post("/register", sessionController.register);
routes.post("/login", sessionController.login);
routes.post("/admin/register", sessionController.registerAdmin);
routes.post("/admin/login", sessionController.loginAdmin);

// Rotas de pizzas
routes.get("/customers", CustomersController.index);
routes.get("/customers/:id", CustomersController.show);
routes.post("/customers", sanitizeMiddleware, pizzaValidator, CustomersController.create);
routes.put("/customers/:id", sanitizeMiddleware, pizzaValidator, CustomersController.update);
routes.delete("/customers/:id", CustomersController.destroy);

// Middleware de autenticação
routes.use(authMiddleware);

// Rotas protegidas
routes.get('/clientes', ClientesController.index);
routes.get('/clientes/:id', ClientesController.show);
routes.post('/clientes', ClientesController.create);
routes.put('/clientes', authMiddleware, ClientesController.update);
routes.delete('/clientes', authMiddleware, ClientesController.destroy);

routes.get('/pedidos', authMiddleware, PedidosController.index);
routes.get('/pedidos/:id', PedidosController.show);
routes.post('/pedidos', authMiddleware, PedidosController.create);
routes.put('/pedidos/:id', PedidosController.update);
routes.delete('/pedidos/:id', PedidosController.destroy);


// Rotas protegidas de administradores
routes.get('/administradores', administradorController.index);
routes.get('/administradores/:id', administradorController.show);
routes.post('/administradores', adminValidator, administradorController.create);
routes.put('/administradores', adminValidator, administradorController.update);
routes.delete('/administradores', administradorController.destroy);

export default routes;
