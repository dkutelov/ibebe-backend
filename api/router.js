const { Router } = require('express');

const userController = require('./controllers/userController');
const questionController = require('./controllers/questionController');
const categoryController = require('./controllers/categoryController');
const tagController = require('./controllers/tagController');

const router = Router();

router.use('/users', userController);
router.use('/questions', questionController);
router.use('/categories', categoryController);
router.use('/tags', tagController);

module.exports = router;
