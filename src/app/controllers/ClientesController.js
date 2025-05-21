import Cliente from '../../models/cliente.js';
import { validationResult } from "express-validator";

class ClientesController {
  // Listar todos os clientes
  async index(req, res) {
    try {
      // Verifica se o usuário é admin
      if (req.userRole === 'admin') {
        const clientes = await Cliente.findAll();
        return res.json(clientes);
      }

      // Se for cliente comum, retorna apenas o próprio perfil
      const cliente = await Cliente.findByPk(req.userId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      return res.json([cliente]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  // Recuperar um cliente pelo ID
  async show(req, res) {
    try {
      const id = Number(req.params.id);

      // Se o usuário não for admin, só pode acessar seu próprio perfil
      if (req.userRole !== 'admin' && req.userId !== id) {
        return res.status(403).json({ error: "Acesso negado." });
      }

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      return res.json(cliente);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar o cliente' });
    }
  }

  // Criar um novo cliente
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, email, telefone, senha } = req.body;
      const novoCliente = await Cliente.create({ nome, email, telefone, senha });
      return res.status(201).json(novoCliente);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }

  // Atualizar um cliente
async update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // ID do usuário autenticado pelo token JWT
    const userId = req.userId;

    const { nome, email, telefone, senha } = req.body;
    const cliente = await Cliente.findByPk(userId);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Atualiza apenas os campos enviados
    if (nome) cliente.nome = nome;
    if (email) cliente.email = email;
    if (telefone) cliente.telefone = telefone;
    if (senha) cliente.senha = senha;

    await cliente.save();
    return res.json({ message: 'Conta atualizada com sucesso', cliente });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar sua conta' });
  }
}


 /* async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = Number(req.params.id);


      // Verifica se é o próprio usuário ou admin
      if (req.userRole !== 'admin' && req.userId !== id) {
        return res.status(403).json({ error: "Acesso negado." });
      }

      const { nome, email, telefone, senha } = req.body;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      cliente.nome = nome;
      cliente.email = email;
      cliente.telefone = telefone;
      cliente.senha = senha;

      await cliente.save();

      return res.json(cliente);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }*/

  // Deletar um cliente
  /*async destroy(req, res) {
    try {
      const id = Number(req.params.id);

      // Verifica se é o próprio usuário ou admin
      if (req.userRole !== 'admin' && req.userId !== id) {
        return res.status(403).json({ error: "Acesso negado." });
      }

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await cliente.destroy();
      return res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }*/

    // controllers/ClienteController.js
     async destroy(req, res) {
          try {
        // ID do usuário autenticado pelo token JWT
           const userId = req.userId;

           // Busca o cliente pelo ID do usuário autenticado
           const cliente = await Cliente.findByPk(userId);

             if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
                      }

                  // Exclui o próprio cliente
                   await cliente.destroy();
                   return res.json({ message: 'Sua conta foi excluída com sucesso' });
                     } catch (error) {
                     return res.status(500).json({ error: 'Erro ao deletar sua conta' });
                    }
                }

              }

export default new ClientesController();