const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  },
);

commentSchema.virtual('likes').get(function () {
  return this.liked.length;
});

module.exports = mongoose.model('Comment', commentSchema);
