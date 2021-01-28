const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validators = require('../utils/validators');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
        default: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    },
    bookmarkedQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
});

// validation password - one capital, one number, one special character
// validation email
userSchema.path('avatar').validate(validators.urlValidator, 'Not valid url');

module.exports = mongoose.model('User', userSchema);
