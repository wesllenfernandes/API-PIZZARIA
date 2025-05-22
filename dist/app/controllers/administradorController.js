"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _administradorjs = require('../../models/administrador.js'); var _administradorjs2 = _interopRequireDefault(_administradorjs);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class AdministradorController {
  // Listar apenas o administrador autenticado
  async index(req, res) {
    try {
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const administrador = await _administradorjs2.default.findByPk(req.adminId, {
        attributes: ['id', 'nome', 'email']
      });

      if (!administrador) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      return res.status(200).json(administrador);
    } catch (error) {
      console.error("Erro ao buscar administrador:", error);
      return res.status(500).json({ error: 'Erro ao buscar administrador' });
    }
  }

  // Buscar administrador por ID (manter apenas se necessário)
  async show(req, res) {
    return res.status(403).json({ error: 'Acesso não autorizado' });
  }

  // Criar novo administrador
  async create(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const existente = await _administradorjs2.default.findOne({ where: { email } });
      if (existente) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const novoAdministrador = await _administradorjs2.default.create({ nome, email, senha });
      return res.status(201).json({
        id: novoAdministrador.id,
        nome: novoAdministrador.nome,
        email: novoAdministrador.email
      });
    } catch (error) {
      console.error("Erro ao criar administrador:", error);
      return res.status(500).json({ error: 'Erro ao criar administrador' });
    }
  }

  // Atualizar apenas o próprio administrador logado
  async update(req, res) {
    try {
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const administrador = await _administradorjs2.default.findByPk(req.adminId);
      if (!administrador) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      const { nome, email, senha } = req.body;

      if (nome) administrador.nome = nome;
      if (email) administrador.email = email;
      if (senha) administrador.senha = senha;

      await administrador.save();

      return res.status(200).json({
        id: administrador.id,
        nome: administrador.nome,
        email: administrador.email
      });
    } catch (error) {
      console.error("Erro ao atualizar administrador:", error);
      return res.status(500).json({ error: 'Erro ao atualizar administrador' });
    }
  }

  // Deletar apenas o próprio administrador logado
  async destroy(req, res) {
    try {
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const administrador = await _administradorjs2.default.findByPk(req.adminId);
      if (!administrador) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      await administrador.destroy();
      return res.status(200).json({ message: 'Administrador deletado com sucesso' });
    } catch (error) {
      console.error("Erro ao deletar administrador:", error);
      return res.status(500).json({ error: 'Erro ao deletar administrador' });
    }
  }
}

exports. default = new AdministradorController();
