const { Router } = require('express');
const questionService = require('../services/questionService');

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const questions = await questionService.getAll();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const question = await questionService.getOneById(id);
        res.json(question);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.post('/', async (req, res) => {
    try {
        const question = await questionService.create(req.body);
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ err });
    }
});

// router.patch('/', async (req, res) => {
//     try {
//         const updatedTag = await tagService.update(req.body);
//         res.json(updatedTag);
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// });

// router.delete('/', async (req, res) => {
//     try {
//         const deletedTag = await tagService.remove(req.body);
//         res.json(deletedTag);
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// });

module.exports = router;