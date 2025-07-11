const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Rota para listar todas as tarefas
router.get('/', tarefasController.listarTarefas);
router.post('/', tarefasController.criarTarefa);
router.put('/:id', tarefasController.atualizarTarefa);
router.delete('/:id', tarefasController.deletarTarefa);

module.exports = router;