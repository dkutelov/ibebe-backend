const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = mongoose.Schema(
    {
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
    },
    {
        toJSON: { virtuals: true },
    }
);

reactionSchema.virtual('numbers').get(function () {
    return {
        loves: this.loves.length,
        claps: this.claps.length,
        likes: this.likes.length,
        thankful: this.thankful.length,
        unsatisfied: this.unsatisfied.length,
    };
});

reactionSchema.virtual('votes').get(function () {
    return (
        this.loves.length +
        this.likes.length +
        this.claps.length +
        this.thankful.length
    );
});

module.exports = mongoose.model('Reaction', reactionSchema);
