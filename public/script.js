const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const message = document.getElementById('message');

async function loadTasks() {
  const response = await fetch('/api/tasks');
  const tasks = await response.json();

  list.replaceChildren();

  tasks.forEach(task => {
    const item = document.createElement('li');
    const title = document.createElement('span');
    const completeButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    title.textContent = task.title;
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    deleteButton.textContent = 'Delete';

    if (task.completed) item.classList.add('completed');

    completeButton.addEventListener('click', async () => {
      await fetch(`/api/tasks/${task.id}`, { method: 'PATCH' });
      loadTasks();
    });

    deleteButton.addEventListener('click', async () => {
      await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
      loadTasks();
    });

    item.append(title, completeButton, deleteButton);
    list.appendChild(item);
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  message.textContent = '';

  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input.value })
  });

  if (!response.ok) {
    message.textContent = 'Unable to add task.';
    return;
  }

  input.value = '';
  loadTasks();
});

loadTasks();