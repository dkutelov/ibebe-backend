const Answer = require('../../models/Answer');
const Comment = require('../../models/Comment');

const imageService = require('./imageService');
const questionService = require('./questionService');
const answerData = require('../data/answerData');
const dataFactory = require('../data/dataFactory')(Comment);

async function getAll(questionId) {
  const answers = await Answer.find({ question: questionId })
    .populate({
      path: 'imageURL',
      select: 'imageURL -_id',
    })
    .populate({ path: 'author', select: 'username avatar' });

  return answers.sort((a, b) => {
    const aVotes = a.upVotes.length - a.downVotes.length;
    const bVotes = b.upVotes.length - b.downVotes.length;
    return bVotes - aVotes;
  });
}

async function create(answer) {
  answer.question = answer.questionId;
  answer.author = answer.userId;
  answer.imageURL = await Promise.all(
    answer.imageURL.map(async (imageURL, index) => {
      const isMain = index === 0 ? true : false;
      const image = await imageService.addImage(imageURL, isMain);
      return image._id;
    }),
  );

  const newAnswer = new Answer(answer);
  await newAnswer.save();
  const answerId = newAnswer._id;
  await questionService.addAnswer(answer.questionId, answerId);
  return newAnswer;
}

async function update(data) {
  const answer = { text: data.answer.text, imageURL: data.answer.imageURL };

  answer.imageURL = await Promise.all(
    answer.imageURL.map(async (img, index) => {
      const existingImage = await imageService.findByUrl(img.imageURL);

      if (existingImage) {
        return existingImage._id;
      } else {
        const isMain = index === 0 ? true : false;
        const image = await imageService.addImage(img.imageURL, isMain);
        return image._id;
      }
    }),
  );

  return await answerData.updateOne(data.answer._id, answer);
}

async function remove(id) {
  return await answerData.deleteOne(id);
}

async function getOneById(id) {
  const currentAnswer = await answerData.getOneById(id);
  return currentAnswer;
}

async function vote(answerId, voteType, userId) {
  let upatedAnwer = null;
  const hasUpVoted = await answerData.hasUpVoted(answerId, userId);
  const hasDownVoted = await answerData.hasDownVoted(answerId, userId);

  if (voteType === 'up') {
    if (hasUpVoted) {
      throw 'You have already upvoted!';
    }

    if (hasDownVoted) await answerData.removeDownvote(answerId, userId);

    upatedAnwer = await answerData.upvote(answerId, userId);
  } else if (voteType === 'down') {
    if (hasDownVoted) {
      throw 'You have already downvoted!';
    }

    if (hasUpVoted) await answerData.removeUpvote(answerId, userId);

    upatedAnwer = await answerData.downvote(answerId, userId);
  }
  return upatedAnwer;
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

async function getCommentsByAnswerId(answerId) {
  return Comment.find({ answerId })
    .populate({ path: 'author' })
    .sort('created');
}

function getAnswersByUserId(userId) {
  return Answer.find({ author: userId }).populate({
    path: 'category',
    select: 'name',
  });
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  getOneById,
  vote,
  createAndAddComment,
  getCommentsByAnswerId,
  getAnswersByUserId,
};
