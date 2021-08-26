const { Router } = require('express');

const questionService = require('../services/questionService');

const router = new Router();

router.get('/', async (req, res) => {
  const params = req.query;
  try {
    const questions = await questionService.getAll(params);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const questions = await questionService.getQuestionsByUserId(userId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const category = await questionService.getOneById(id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedQuestion = await questionService.remove(id);
    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/:id/comments', async (req, res) => {
  const questionId = req.params.id;
  let comments;
  try {
    const comments = await questionService.getCommentsByQuestionId(questionId);
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post('/', async (req, res) => {
  let question = req.body;
  question.author = req.user._id;
  try {
    const newQuestion = await questionService.create(question);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post('/vote', async (req, res) => {
  const { questionId, voteType, userId } = req.body;
  try {
    const updatedVotesCount = await questionService.vote(
      questionId,
      voteType,
      userId,
    );

    res
      .status(201)
      .json({ message: 'Thanks for your vote', updatedVotesCount });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post('/:id/comments', async (req, res) => {
  const questionId = req.params.id;
  let comment = req.body;
  try {
    const newComment = await questionService.createAndAddComment(
      questionId,
      comment,
    );
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedQuestion = await questionService.update(req.body);
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: { message: 'Bad Request' } });
  }
});

router.delete('/', async (req, res) => {
  try {
    const deletedCategory = await questionService.remove(req.body);
    res.json(deletedCategory);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
