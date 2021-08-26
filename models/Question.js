const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 15,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
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
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
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

// computed time since creation
questionSchema.virtual('answersCount').get(function () {
  return this.answers.length;
});

questionSchema.virtual('upVotesCount').get(function () {
  return this.upVotes.length;
});

questionSchema.virtual('downVotesCount').get(function () {
  return this.downVotes.length;
});

questionSchema.index({ title: 'text', text: 'text' });

module.exports = mongoose.model('Question', questionSchema);
