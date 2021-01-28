const { Router } = require('express');
const userService = require('../services/userServices');

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getOneById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await userService.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.patch('/', async (req, res) => {
    try {
        const user = await userService.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.delete('/', async (req, res) => {
    try {
        const user = await userService.remove(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ err });
    }
});

module.exports = router;
