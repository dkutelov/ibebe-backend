const { ObjectId } = require('mongodb');
const Answer = require('../../models/Answer');

module.exports = {
  async updateOne(id, updatedProps) {
    return await Answer.findByIdAndUpdate(
      id,
      { $set: updatedProps },
      { new: true },
    );
  },

  getOneById(questionId) {
    return Answer.findOne({ _id: questionId }).populate({
      path: 'imageURL',
    });
  },

  hasUpVoted(answerId, userId) {
    return Answer.findOne({
      _id: answerId,
      upVotes: {
        $in: [userId],
      },
    });
  },

  hasDownVoted(answerId, userId) {
    return Answer.findOne({
      _id: answerId,
      downVotes: {
        $in: [userId],
      },
    });
  },

  async upvote(answerId, userId) {
    return await Answer.findByIdAndUpdate(
      answerId,
      { $push: { upVotes: userId } },
      { new: true },
    );
  },

  async removeUpvote(answerId, userId) {
    return await Answer.findByIdAndUpdate(
      answerId,
      { $pull: { upVotes: userId } },
      { new: true },
    );
  },

  async downvote(answerId, userId) {
    return await Answer.findByIdAndUpdate(
      answerId,
      { $push: { downVotes: userId } },
      { new: true },
    );
  },

  async removeDownvote(answerId, userId) {
    return await Answer.findByIdAndUpdate(
      answerId,
      { $pull: { downVotes: userId } },
      { new: true },
    );
  },

  async deleteOne(id) {
    return await Answer.findByIdAndRemove(id);
  },
};
