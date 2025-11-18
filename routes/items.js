const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Listar
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Buscar por id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if(!item) return res.status(404).json({ error: 'Não encontrado' });
    res.json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Criar
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if(!name || !category) return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    const newItem = new Item({ name, category, price, description });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updated) return res.status(404).json({ error: 'Não encontrado' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ error: 'Não encontrado' });
    res.json({ message: 'Deletado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
