const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = mongoose.Schema({
    loves: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    claps: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    thankful: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    unsatisfied: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

module.exports = mongoose.model('Reaction', reactionSchema);
