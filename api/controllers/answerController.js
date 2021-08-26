const { Router } = require('express');

const answerService = require('../services/answerService');

const router = new Router();

router.get('/', async (req, res) => {
  const questionId = req.query.questionId;
  if (!questionId) {
    res.status(400).json({ err: { message: 'Something went wrong!' } });
  }

  try {
    const answers = await answerService.getAll(questionId);
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const answer = await answerService.getOneById(id);
    res.json(answer);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const answers = await answerService.getAnswersByUserId(userId);
    res.json(answers);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/:id/comments', async (req, res) => {
  const answerId = req.params.id;
  let comments;
  try {
    const comments = await answerService.getCommentsByAnswerId(answerId);
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post('/', async (req, res) => {
  let answer = req.body;
  try {
    const newAnswer = await answerService.create(answer);
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedAnswer = await answerService.update(req.body);
    res.json(updatedAnswer);
  } catch (error) {
    res.status(400).json({ error: { message: 'Bad Request' } });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAnswer = await answerService.remove(id);
    res.json(deletedAnswer);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/vote', async (req, res) => {
  const { answerId, voteType, userId } = req.body;
  try {
    const updatedVotesCount = await answerService.vote(
      answerId,
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
  const answerId = req.params.id;
  let comment = req.body;
  try {
    const newComment = await answerService.createAndAddComment(
      answerId,
      comment,
    );
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
