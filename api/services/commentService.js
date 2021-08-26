const Comment = require('../../models/Comment');

async function like(commentId, userId) {
  const hasLiked = await Comment.findOne({
    _id: commentId,
    liked: { $in: [userId] },
  });

  if (hasLiked) {
    throw 'You have already liked!';
  }

  let upatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { $push: { liked: userId } },
    { new: true },
  );

  return upatedComment;
}

async function createAndAddComment(answerId, commentData) {
  const comment = new Comment({ ...commentData, answerId });
  const savedComment = await dataFactory.createOne(comment);
  await Answer.findByIdAndUpdate(
    answerId,
    { $push: { comments: savedComment._id } },
    { new: true },
  );
  return comment;
}

module.exports = {
  like,
  createAndAddComment,
};
