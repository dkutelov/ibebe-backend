const { Router } = require('express');

const authController = require('./controllers/authController');
const questionController = require('./controllers/questionController');
const answerController = require('./controllers/answerController');
const categoryController = require('./controllers/categoryController');
const tagController = require('./controllers/tagController');
const imageController = require('./controllers/imageController');
const commentController = require('./controllers/commentController');

const router = Router();

router.use('/auth', authController);
router.use('/questions', questionController);
router.use('/answers', answerController);
router.use('/categories', categoryController);
router.use('/tags', tagController);
router.use('/image', imageController);
router.use('/comments', commentController);

module.exports = router;
