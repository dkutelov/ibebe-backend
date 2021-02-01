const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validators = require('../utils/validators');

const questionSchema = mongoose.Schema(
    {
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
            default:
                'https://images.vexels.com/media/users/3/152864/isolated/preview/2e095de08301a57890aad6898ad8ba4c-yellow-circle-question-mark-icon-by-vexels.png',
        },
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
        reactions: {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
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
    },
    {
        toJSON: { virtuals: true },
    }
);

// computed time since creation
questionSchema.virtual('answersCount').get(function () {
    return this.answers.length;
});

questionSchema
    .path('imageURL')
    .validate(validators.urlValidator, 'Not valid url');

module.exports = mongoose.model('Question', questionSchema);
