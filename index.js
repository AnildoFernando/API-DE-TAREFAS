const express = require('express');     // Importa o framework Express
const app = express();      // Cria uma instância do aplicativo Express
const port = 3000;      // Define a porta do servidor

const tarefasRoutes = require('./routes/tarefas');  // Importa as rotas de tarefas

app.use(express.json());    // Middleware para interpretar JSON
app.use(express.static('public'));  // Serve arquivos estáticos da pasta 'public'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    // Envia o arquivo index.html quando a raiz é acessada
});

app.use('/tarefas', tarefasRoutes);  // Define as rotas de tarefas

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});     // Inicia o servidor e exibe uma mensagem no console quando estiver pronto
