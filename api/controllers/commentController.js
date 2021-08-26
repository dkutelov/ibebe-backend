const { Router } = require('express');
const commentService = require('../services/commentService');

const router = new Router();

router.post('/:id/like', async (req, res) => {
  const commentId = req.params.id;
  const { userId } = req.body;

  try {
    const updatedComment = await commentService.like(commentId, userId);
    res.status(201).json({ likes: updatedComment.likes });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
