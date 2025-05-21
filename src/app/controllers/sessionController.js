import Cliente from "../../models/cliente.js";
import Administrador from "../../models/administrador.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class SessionController {
  // Registro de cliente
  async register(req, res) {
    const { nome, email, telefone, senha } = req.body;

    try {
      const clienteExistente = await Cliente.findOne({ where: { email } });
      if (clienteExistente) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

     
      const cliente = await Cliente.create({
        nome,
        email,
        telefone,
        senha,
      });

      return res.status(201).json({
        cliente: {
          id: cliente.id_cliente,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
        }
      });
    } catch (error) {
      console.error("Erro ao registrar cliente:", error);
      return res.status(500).json({ error: "Erro no servidor ao registrar cliente" });
    }
  }

  // Login de cliente
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const cliente = await Cliente.findOne({ where: { email } });
      if (!cliente) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(senha, cliente.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: cliente.id_cliente, role: 'client' },
        'seu_segredo_jwt',
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        cliente: {
          id: cliente.id_cliente,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
        },
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  }

  // Registro de administrador
  async registerAdmin(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const adminExistente = await Administrador.findOne({ where: { email } });
      if (adminExistente) {
        return res.status(400).json({ error: "Administrador já cadastrado" });
      }

      const administrador = await Administrador.create({ nome, email, senha });

      return res.status(201).json({
        administrador: {
          id: administrador.id,
          nome: administrador.nome,
          email: administrador.email,
        }
      });
    } catch (error) {
      console.error("Erro ao registrar administrador:", error);
      return res.status(500).json({ error: "Erro ao registrar administrador" });
    }
  }

  // Login de administrador
  async loginAdmin(req, res) {
    const { email, senha } = req.body;

    try {
      const admin = await Administrador.findOne({ where: { email } });
      if (!admin) {
        return res.status(401).json({ error: "Administrador não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(senha, admin.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: admin.id, role: 'admin' },
        'seu_segredo_jwt',
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        administrador: {
          id: admin.id,
          nome: admin.nome,
          email: admin.email,
        },
        token,
      });
    } catch (error) {
      console.error("Erro no login de administrador:", error);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  }
}

export default new SessionController();
