const mongoose = require('mongoose');
const validators = require('../utils/validators');

const answerSchema = mongoose.Schema({
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
    imageURL: {
        type: String,
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

// computed time since creation

messageSchema
    .path('imageURL')
    .validate(validators.urlValidator, 'Not valid url');

module.exports = mongoose.model('Answer', answerSchema);
