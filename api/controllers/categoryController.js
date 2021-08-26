const { Router } = require('express');
const categoryService = require('../services/categoryService');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryService.getOneById(id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedCategory = await categoryService.create(req.body);
    res.json(savedCategory);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post('/vote', async (req, res) => {});

router.patch('/', async (req, res) => {
  try {
    const updatedCategory = await categoryService.update(req.body);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.delete('/', async (req, res) => {
  try {
    const deletedCategory = await categoryService.remove(req.body);
    res.json(deletedCategory);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
