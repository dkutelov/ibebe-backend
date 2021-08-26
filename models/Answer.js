const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = mongoose.Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    text: {
      type: String,
      required: true,
      minLength: 15,
      trim: true,
      default: 'anonymous',
    },
    imageURL: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image',
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    upVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  },
);

answerSchema.virtual('upVotesCount').get(function () {
  return this.upVotes.length;
});

answerSchema.virtual('downVotesCount').get(function () {
  return this.downVotes.length;
});

module.exports = mongoose.model('Answer', answerSchema);
