const Question = require('../../models/Question');
const Comment = require('../../models/Comment');

const questionData = require('../data/questionData');
const imageService = require('./imageService');
const tagService = require('./tagService');
const dataFactory = require('../data/dataFactory')(Comment);

async function getAll(params) {
  const questions = await questionData.getAll(params);

  if (params && params.sortBy === 'votes') {
    questions.sort((a, b) => {
      const aVotes = a.upVotes.length - a.downVotes.length;
      const bVotes = b.upVotes.length - b.downVotes.length;
      return bVotes - aVotes;
    });
  } else if (params && params.sortBy === 'latest') {
    questions.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (params && params.sortBy === 'views') {
    questions.sort((a, b) => b.views - a.views);
  }

  if (params.limit) {
    const limit = Number(params.limit);
    if (questions.length > limit) {
      questions.splice(limit, questions.length - limit);
    }
  }

  return questions;
}

async function getCount(params) {
  const questions = await questionData.getCount(params);
  return questions;
}

function getQuestionsByUserId(userId) {
  return Question.find({ author: userId }).populate({
    path: 'category',
    select: 'name',
  });
}

async function create(question) {
  const tags = question.tags;

  question.imageURL = await Promise.all(
    question.imageURL.map(async (imageURL, index) => {
      const isMain = index === 0 ? true : false;
      const image = await imageService.addImage(imageURL, isMain);
      return image._id;
    }),
  );

  question.tags = await Promise.all(
    question.tags.map(async (tag) => {
      if (tag._id) return tag._id;
      const newTag = await tagService.create({ name: tag.name });
      return newTag._id;
    }),
  );

  const newQuestion = new Question(question);
  return await newQuestion.save();
}

async function update(data) {
  const { questionData, questionId } = data;

  questionData.imageURL = await Promise.all(
    questionData.imageURL.map(async (imageURL, index) => {
      const isMain = index === 0 ? true : false;

      const existingImage = await imageService.findByUrl(imageURL);
      if (existingImage) {
        return existingImage._id;
      } else {
        const image = await imageService.addImage(imageURL, isMain);
        return image._id;
      }
    }),
  );

  questionData.tags = await Promise.all(
    questionData.tags.map(async (tag) => {
      if (tag._id) return tag._id;
      const newTag = await tagService.create({ name: tag.name });
      return newTag._id;
    }),
  );

  return Question.findByIdAndUpdate(
    questionId,
    { $set: questionData },
    { new: true },
  );
}

async function remove(questionId) {
  return await questionData.deleteOne(questionId);
}

async function getOneById(id) {
  const currentQuestion = await questionData.getOneById(id);
  let views = currentQuestion.views;
  views += 1;
  const updatedQuestionWithViews = await questionData.updateOne(id, {
    views,
  });
  return updatedQuestionWithViews;
}

async function vote(questionId, voteType, userId) {
  let updatedQuestion = null;
  const hasUpVoted = await questionData.hasUpVoted(questionId, userId);
  const hasDownVoted = await questionData.hasDownVoted(questionId, userId);

  if (voteType === 'up') {
    if (hasUpVoted) {
      throw 'You have already upvoted!';
    }

    if (hasDownVoted) await questionData.removeDownvote(questionId, userId);

    updatedQuestion = await questionData.upvote(questionId, userId);
  } else if (voteType === 'down') {
    if (hasDownVoted) {
      throw 'You have already downvoted!';
    }

    if (hasUpVoted) await questionData.removeUpvote(questionId, userId);

    updatedQuestion = await questionData.downvote(questionId, userId);
  }
  const updatedVotes = {
    upVotesCount: updatedQuestion.upVotes.length,
    downVotesCount: updatedQuestion.downVotes.length,
  };

  return updatedVotes;
}

async function addAnswer(questionId, answerId) {
  return await Question.findByIdAndUpdate(
    questionId,
    { $push: { answers: answerId } },
    { new: true },
  );
}

async function createAndAddComment(questionId, commentData) {
  const comment = new Comment({ ...commentData, questionId });
  const savedComment = await dataFactory.createOne(comment);
  await Question.findByIdAndUpdate(
    questionId,
    { $push: { comments: savedComment._id } },
    { new: true },
  );
  return comment;
}

async function getCommentsByQuestionId(questionId) {
  return Comment.find({ questionId })
    .populate({ path: 'author' })
    .sort('created');
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  getOneById,
  vote,
  addAnswer,
  createAndAddComment,
  getCommentsByQuestionId,
  getQuestionsByUserId,
  getCount,
};
