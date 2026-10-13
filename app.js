const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
let tasks = [
  { id: 1, title: 'Learn Git and GitHub', completed: false },
  { id: 2, title: 'Understand Jenkins', completed: false }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const title = req.body.title?.trim();

  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const task = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = !task.completed;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const previousLength = tasks.length;
  tasks = tasks.filter(t => t.id !== Number(req.params.id));

  if (tasks.length === previousLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).end();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`To-Do Manager running on port ${PORT}`);
});