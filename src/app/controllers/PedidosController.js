import Pedido from '../../models/pedido.js';
import Cliente from '../../models/cliente.js';
import Pizza from '../../models/Pizza.js';
import { validationResult } from "express-validator";

class PedidosController {
  // Listar todos os pedidos
  /*async index(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }*/

async index(req, res) {
    try {
      /*const id_cliente = req.userId; // ID do cliente autenticado pelo token JWT

      console.log("ID do cliente autenticado:", id_cliente);

      // Busca os pedidos do cliente autenticado
      const pedidos = await Pedido.findAll({
        where: {
          id_cliente: id_cliente
        }
      });
      */
     const { userId, adminId, userRole } = req;

    console.log("ID do usuário autenticado:", userId || adminId);
    console.log("Role do usuário:", userRole);

    let pedidos;

    if (userRole === 'admin') {
      // Se for administrador, lista todos os pedidos
      pedidos = await Pedido.findAll();
    } else {
      // Se for cliente, lista apenas os pedidos do cliente autenticado
      pedidos = await Pedido.findAll({
        where: {
          id_cliente: userId
        }
      });
    }


      // Verifica se encontrou pedidos
      if (!pedidos || pedidos.length === 0) {
        return res.status(404).json({ error: 'Nenhum pedido encontrado para este cliente' });
      }

      // Envia os pedidos diretamente (sem o objeto completo do Sequelize)
      const pedidosSimplificados = pedidos.map(pedido => ({
        id_pedido: pedido.id_pedido,
        id_cliente: pedido.id_cliente,
        id_pizza: pedido.id_pizza,
        status: pedido.status,
        data_pedido: pedido.data_pedido,
        forma_pagamento: pedido.forma_pagamento,
        total_pedido: pedido.total_pedido,
        prioridade: pedido.prioridade
      }));

      //console.log('Resposta:', { pedidos: pedidosSimplificados });

      return res.status(200).json({ pedidos: pedidosSimplificados });

    } catch (error) {
      return res.status(200).json({ error: 'Erro ao listar os pedidos', detalhe: error.message });
    }
  }
  

// Listar os pedidos do cliente autenticado
 /* async listarPedidosCliente(req, res) {
   try {
      const id_cliente = req.userId; // ID do cliente vindo do token (AuthMiddleware)

      if (!id_cliente) {
        return res.status(401).json({ error: 'Cliente não autenticado' });
      }

      // Verifica se o cliente existe
      const cliente = await Cliente.findByPk(id_cliente);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado no banco de dados' });
      }

      // Busca os pedidos do cliente autenticado
      const pedidos = await Pedido.findAll({
        where: { id_cliente },
        order: [['data_pedido', 'DESC']] // Ordena por data (mais recente primeiro)
      });

      if (pedidos.length === 0) {
        return res.status(404).json({ message: 'Você não tem pedidos cadastrados.' });
      }

      return res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar pedidos do cliente', detalhe: error.message });
    }
  }*/

  // Recuperar um pedido pelo ID
  async show(req, res) {
    try {
      const id = Number(req.params.id);
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      return res.json(pedido);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar o pedido' });
    }
  }




  
  async create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { forma_pagamento, total_pedido, status, prioridade, id_pizza } = req.body;

    // Validação do id_pizza
    if (!id_pizza) {
      return res.status(400).json({ error: 'id_pizza é obrigatório' });
    }

    if (isNaN(id_pizza)) {
      return res.status(400).json({ error: 'id_pizza deve ser um número' });
    }

    // Verificação do cliente (admin ou cliente autenticado)
    let id_cliente;
    if (req.userRole === 'admin') {
      id_cliente = req.body.id_cliente;
      if (!id_cliente) {
        return res.status(400).json({ error: 'ID do cliente é obrigatório para o administrador' });
      }
    } else {
      id_cliente = req.userId;
    }

    // Verifica se o total do pedido é um número válido
    const totalPedidoNum = Number(total_pedido);
    if (isNaN(totalPedidoNum) || totalPedidoNum <= 0) {
      return res.status(400).json({ error: "Total do pedido inválido" });
    }

    // Verifica se o cliente existe
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verifica se a pizza existe
    const pizza = await Pizza.findByPk(id_pizza);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza não encontrada' });
    }

    // Cria o pedido
    const novoPedido = await Pedido.create({
      id_cliente,
      id_pizza,
      forma_pagamento,
      total_pedido: totalPedidoNum,
      status: status || 'Pendente',
      prioridade: prioridade || false
    });

    return res.status(201).json(novoPedido);
  } catch (error) {
    console.error(error); // Para ver o erro detalhado no console
    return res.status(500).json({ error: 'Erro ao criar pedido', detalhe: error.message });
  }
}



  // Criar um novo pedido
  /* async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { forma_pagamento, total_pedido, status, prioridade} = req.body;
      //const id_cliente = req.userId; // de acordo com middleware
      let id_cliente;

    if (req.userRole === 'admin') {
      id_cliente = req.body.id_cliente;
      if (!id_cliente) {
        return res.status(400).json({ error: 'ID do cliente é obrigatório para o administrador' });
      }
    } else {
      id_cliente = req.userId;
    }


      // Verifica se o total do pedido é um número válido
      const totalPedidoNum = Number(total_pedido);
      if (isNaN(totalPedidoNum)) {
       return res.status(400).json({ error: "Total do pedido inválido" });
      }


      // Verifica se o cliente existe (opcional, mas mais seguro)
      const cliente = await Cliente.findByPk(id_cliente);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado pelo token JWT' });
      }

      
      // Cria o pedido
      const novoPedido = await Pedido.create({
        id_cliente,
        forma_pagamento,
        total_pedido, totalPedidoNum,
        status: status || 'Pendente',  // Status padrão se não for fornecido
        prioridade: prioridade || 'Normal'  // Prioridade padrão se não for fornecida
      });

      return res.status(201).json(novoPedido);
    } catch (error) {
      console.error(error); // Para ver o erro detalhado no console
      return res.status(500).json({ error: 'Erro ao criar pedido', detalhe: error.message });
    }
  }*/

//////////////////////////////////////
  /*async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id_cliente, forma_pagamento, total_pedido, status, prioridade } = req.body;
      const novoPedido = await Pedido.create({
        id_cliente,
        forma_pagamento,
        total_pedido,
        status,          // opcional: caso queira permitir definir status inicial
        prioridade       // opcional: se não vier, usará default
      });
      return res.status(201).json(novoPedido);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }*/

  // Atualizar um pedido


async update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id_pedido = Number(req.params.id);
    const id_cliente = req.userRole === 'client' ? req.userId : null;

    // Verifica se o pedido existe
    const pedido = await Pedido.findByPk(id_pedido);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Verifica se é cliente tentando atualizar seu próprio pedido
    if (id_cliente && pedido.id_cliente !== id_cliente) {
      return res.status(403).json({ error: 'Você não tem permissão para atualizar este pedido' });
    }

    // Recebe os campos que podem ser atualizados
    const { status, forma_pagamento, total_pedido, prioridade, id_pizza } = req.body;

    // Atualiza apenas os campos fornecidos
    pedido.id_pizza = id_pizza ?? pedido.id_pizza;
    pedido.status = status ?? pedido.status;
    pedido.forma_pagamento = forma_pagamento ?? pedido.forma_pagamento;
    pedido.total_pedido = total_pedido ?? pedido.total_pedido;
    pedido.prioridade = prioridade ?? pedido.prioridade;

    await pedido.save();

    return res.json({ message: 'Pedido atualizado com sucesso', pedido });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar pedido', detalhe: error.message });
  }
}



  /*async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = Number(req.params.id);
      const { status, forma_pagamento, total_pedido, prioridade } = req.body;

      const pedido = await Pedido.findByPk(id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      // Atualiza somente os campos permitidos
      pedido.status = status ?? pedido.status;
      pedido.forma_pagamento = forma_pagamento ?? pedido.forma_pagamento;
      pedido.total_pedido = total_pedido ?? pedido.total_pedido;
      pedido.prioridade = prioridade ?? pedido.prioridade;

      await pedido.save();

      return res.json(pedido);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
  }*/




// admin pode excluir qualquer pedido e cliente pode excluir apenas o seu próprio pedido
async destroy(req, res) {
  try {
    const id_pedido = Number(req.params.id);
    const id_cliente = req.userRole === 'client' ? req.userId : null;

    // Verifica se o pedido existe
    const pedido = await Pedido.findByPk(id_pedido);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Verifica se é cliente tentando deletar seu próprio pedido
    if (id_cliente && pedido.id_cliente !== id_cliente) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este pedido' });
    }

    // Permite deletar (cliente do próprio pedido ou administrador)
    await pedido.destroy();
    return res.json({ message: 'Pedido deletado com sucesso' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar pedido', detalhe: error.message });
  }
}

  
  // Deletar um pedido
  /*async destroy(req, res) {
    try {
      const id = Number(req.params.id);
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      await pedido.destroy();
      return res.json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar pedido' });
    }
  }*/
}

export default new PedidosController();
