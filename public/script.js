const listaTarefas = document.getElementById('listaTarefas');
const form = document.getElementById('formTarefa');
const input = document.getElementById('titulo');

const api = 'http://localhost:3000/tarefas';

async function carregarTarefas() {
  listaTarefas.innerHTML = '';
  const res = await fetch(api);
  const tarefas = await res.json();

  tarefas.forEach(tarefa => {
    const item = document.createElement('item');
    item.textContent = tarefa.titulo;
    if (tarefa.concluida) item.classList.add('completed');

    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.onclick = async () => {
      await fetch(`${api}/${tarefa.id}`, { method: 'DELETE' });
      carregarTarefas();
    };

    item.appendChild(btn);
    listaTarefas.appendChild(item);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) return;

  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo })
  });

  input.value = '';
  carregarTarefas();
};

carregarTarefas();
