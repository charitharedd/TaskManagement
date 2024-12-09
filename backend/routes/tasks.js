// routes/tasks.js
const express = require('express');
const { Task } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Fetch all tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

// Create task
router.post('/', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const task = await Task.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ success: true });
});

module.exports = router;
