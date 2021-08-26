const { ObjectId } = require('mongodb');
const Question = require('../../models/Question');

module.exports = {
  async getAll(params) {
    let options = {};

    if (params.category) {
      options.category = params.category;
      //
    }

    if (params.author) {
      options.author = params.author;
    }

    if (params.tag) {
      options.tags = params.tag;
    }

    if (params.search) {
      options = {
        ...options,
        $text: {
          $search: params.search,
        },
      };
    }

    let questions = Question.find(options);
    if (params.pageIndex && params.pageSize) {
      questions
        .skip(+params.pageSize * (+params.pageIndex - 1))
        .limit(+params.pageSize);
    }

    return questions
      .populate({ path: 'author', select: 'username email avatar' })
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'tags', select: 'name' });
  },

  async createOne(newItem) {
    return await newItem.save();
  },

  async updateOne(id, updatedProps) {
    return await Question.findByIdAndUpdate(
      id,
      { $set: updatedProps },
      { new: true },
    )
      .populate({
        path: 'author',
        select: 'username email avatar',
      })
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'tags', select: 'name' })
      .populate({ path: 'imageURL', select: 'imageURL -_id' });
  },

  getOneById(questionId) {
    return Question.findOne({ _id: questionId });
  },

  async getAuthorIdBy(questionId) {
    const { author: authorId } = await Question.findOne({
      _id: questionId,
    }).select('-_id author');
    return authorId;
  },

  hasUpVoted(questionId, userId) {
    return Question.findOne({
      _id: questionId,
      upVotes: {
        $in: [userId],
      },
    });
  },

  hasDownVoted(questionId, userId) {
    return Question.findOne({
      _id: questionId,
      downVotes: {
        $in: [userId],
      },
    });
  },

  async upvote(questionId, userId) {
    return await Question.findByIdAndUpdate(
      questionId,
      { $push: { upVotes: userId } },
      { new: true },
    );
  },

  async removeUpvote(questionId, userId) {
    return await Question.findByIdAndUpdate(
      questionId,
      { $pull: { upVotes: userId } },
      { new: true },
    );
  },

  async downvote(questionId, userId) {
    return await Question.findByIdAndUpdate(
      questionId,
      { $push: { downVotes: userId } },
      { new: true },
    );
  },

  async removeDownvote(questionId, userId) {
    return await Question.findByIdAndUpdate(
      questionId,
      { $pull: { downVotes: userId } },
      { new: true },
    );
  },

  async deleteOne(id) {
    return await Question.findByIdAndRemove(id);
  },
};
