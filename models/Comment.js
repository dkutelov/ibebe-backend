const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    text: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now,
    },
    reactions: {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
    },
});

module.exports = mongoose.model('Comment', commentSchema);
