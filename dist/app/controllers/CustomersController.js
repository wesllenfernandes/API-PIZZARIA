"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Pizzajs = require('../../models/Pizza.js'); var _Pizzajs2 = _interopRequireDefault(_Pizzajs); 
var _expressvalidator = require('express-validator');

class CustomersController {
  // Listar todas as pizzas
  async index(req, res) {
    try {
      const pizzas = await _Pizzajs2.default.findAll();
      return res.json(pizzas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pizzas' });
    }
  }

  // Recuperar uma pizza pelo ID
  async show(req, res) {
    try {
      const id = Number(req.params.id);
      const pizza = await _Pizzajs2.default.findByPk(id);

      if (!pizza) {
        return res.status(404).json({ error: 'Pizza não encontrada' });
      }

      return res.json(pizza);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar a pizza' });
    }
  }

  // Criar uma nova pizza
  async create(req, res) {
    const errors = _expressvalidator.validationResult.call(void 0, req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, descricao, tamanho, preco_base } = req.body;
      const newPizza = await _Pizzajs2.default.create({ nome, descricao, tamanho, preco_base });
      return res.status(201).json(newPizza);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar pizza' });
    }
  }

  // Atualizar uma pizza
  async update(req, res) {
    const errors = _expressvalidator.validationResult.call(void 0, req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = Number(req.params.id);
      const { nome, descricao, tamanho, preco_base } = req.body;

      const pizza = await _Pizzajs2.default.findByPk(id);
      if (!pizza) {
        return res.status(404).json({ error: 'Pizza não encontrada' });
      }

      pizza.nome = nome;
      pizza.descricao = descricao;
      pizza.tamanho = tamanho;
      pizza.preco_base = preco_base;

      await pizza.save();

      return res.json(pizza);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar pizza' });
    }
  }

  // Deletar uma pizza
  async destroy(req, res) {
    try {
      const id = Number(req.params.id);
      const pizza = await _Pizzajs2.default.findByPk(id);

      if (!pizza) {
        return res.status(404).json({ error: 'Pizza não encontrada' });
      }

      await pizza.destroy();
      return res.json({ message: 'Pizza deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar pizza' });
    }
  }
}

exports. default = new CustomersController();
