//  Mover lógica de tarefas para controllers/tarefasController.js

const tarefas = require('../data/tarefas');

// listar todas
function listarTarefas(req, res) {
    res.json(tarefas.lista);
}

// Criar uma nova tarefa
function criarTarefa(req, res) {
    const { titulo }  = req.body;

    if (!titulo) {
        return res.status(400).json({ error: 'O campo de título é obrigatorio'})
    }

    const novaTarefa = {
        id: tarefas.proximoId++,
        titulo,
        concluida: false
    };

    tarefas.lista.push(novaTarefa);
    res.status(201).json(novaTarefa);
}

// Atualizar uma tarefa
function atualizarTarefa(req, res) {
    const { id } = req.params;
    const { titulo, concluida } = req.body;

    const tarefa = tarefas.lista.find(t => t.id === parseInt(id));

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    if (titulo !== undefined) tarefa.titulo = titulo;
    if (concluida !== undefined) tarefa.concluida = concluida;

    res.json(tarefa);
}

// Deletar uma tarefa
function deletarTarefa(req, res) {
    const { id } = req.params;
    const index = tarefas.lista.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefas.lista.splice(index, 1);
    res.status(204).send();
}

module.exports = {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
};
