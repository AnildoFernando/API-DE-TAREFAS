const express = require('express');     // Importa o framework Express
const app = express();      // Cria uma instância do aplicativo Express
const port = 3000;      // Define a porta do servidor

app.use(express.json());    // Middleware para interpretar JSON

let tarefas = [     // Array para armazenar as tarefas
    { id: 1, titulo: 'Aprender Node.js', concluida: false },
    { id: 2, titulo: 'Fazer exercicios', concluida: true },
];

app.get('/', (req, res) => {    // Rota inicial que retorna uma mensagem simples
    res.send('API de tarefas funcionando!');
});

app.get('/tarefas', (req, res) => {
    res.json(tarefas);    // Rota para obter todas as tarefas
})

app.post('/tarefas', (req, res) => {
    const { titulo } = req.body;    // Extrai o título da tarefa do corpo da requisição

    if (!titulo) {   // Verifica se o título foi fornecido
        return res.status(400).json({ error: 'Título é obrigatório' });
    }   // Retorna erro se o título não for fornecido

    const novaTarefa = {
        id: tarefas.length + 1,    // Gera um novo ID para a tarefa
        titulo,
        concluida: false,    // Define a tarefa como não concluída inicialmente
    }

    tarefas.push(novaTarefa);    // Adiciona a nova tarefa ao array de tarefas
    res.status(201).json(novaTarefa);    // Retorna a nova tarefa
});

app.put('/tarefas/:id', (req, res) => {   // Rota para atualizar uma tarefa existente
    const { id } = req.params;   // Extrai o ID da tarefa a ser atualizada dos parâmetros da rota
    const { titulo, concluida } = req.body;    // Extrai o título e o status de conclusão do corpo da requisição

    const tarefa = tarefas.find((t) => t.id === parseInt(id));    // Busca a tarefa pelo ID
    if (!tarefa) {    // Verifica se a tarefa existe
        return res.status(404).json({ error: 'Tarefa não encontrada' });
        // Retorna erro se a tarefa não for encontrada
    }

    if (titulo !== undefined) {    // Verifica se o título foi fornecido
        tarefa.titulo = titulo;    // Atualiza o título da tarefa
    }
    if (concluida !== undefined) {    // Verifica se o status de conclusão foi fornecido
        tarefa.concluida = concluida;    // Atualiza o status de conclusão da tarefa
    }

    res.json(tarefa);    // Retorna a tarefa atualizada
});

app.delete('tarefas/:id', (req, res) => {    // Rota para deletar uma tarefa
    const { id } = req.params;    // Extrai o ID da tarefa a ser deletada dos parâmetros da rota
    const index = tarefas.findIndex((t) => t.id === parseInt(id));    // Busca o índice da tarefa pelo ID

    if (index === -1) {     // Verifica se a tarefa existe
        return res.status(404).json({ error: 'Tarefa não encontrada' });
        // Retorna erro se a tarefa não for encontrada
    }

    tarefas.splice(index, 1);    // Remove a tarefa do array de tarefas
    res.status(204).send();    // Retorna status 204 (No Content)
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});     // Inicia o servidor e exibe uma mensagem no console quando estiver pronto
