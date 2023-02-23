const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sample data
let tasks = [
    { id: 1, title: 'Task 1', description: 'This is task 1.' },
    { id: 2, title: 'Task 2', description: 'This is task 2.' },
    { id: 3, title: 'Task 3', description: 'This is task 3.' }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET a task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found.');
    } else {
        res.json(task);
    }
});

// POST a new task
app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description
    };
    tasks.push(task);
    res.json(task);
});

// PUT (update) an existing task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found.');
    } else {
        task.title = req.body.title;
        task.description = req.body.description;
        res.json(task);
    }
});

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(task => task.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Task not found.');
    } else {
        tasks.splice(index, 1);
        res.status(204).send();
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
