const { Router } = require('express');
const tagService = require('../services/tagService');

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const tags = await tagService.getAll();
        res.json(tags);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const tag = await tagService.getOneById(id);
        res.json(tag);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedTag = await tagService.create(req.body);
        res.status(201).json(savedTag);
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.patch('/', async (req, res) => {
    try {
        const updatedTag = await tagService.update(req.body);
        res.json(updatedTag);
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.delete('/', async (req, res) => {
    try {
        const deletedTag = await tagService.remove(req.body);
        res.json(deletedTag);
    } catch (err) {
        res.status(400).json({ err });
    }
});

module.exports = router;
