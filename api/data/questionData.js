const { ObjectId } = require('mongodb');
const Question = require('../../models/Question');
const Reaction = require('../../models/Reaction');

module.exports = {
    async getAll(options = {}) {
        return await Question.find(options)
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'tags', select: 'name' })
            .populate({ path: 'reactions' });
    },
    async createOne(newItem) {
        return await newItem.save();
    },
    async updateOne(id, updatedProps) {
        return await Question.findByIdAndUpdate(
            id,
            { $set: updatedProps },
            { new: true }
        )
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'tags', select: 'name' })
            .populate({ path: 'reactions' });
    },
    async getOneById(questionId) {
        return await Question.findById(questionId);
    },

    async getReactionsIdBy(questionId) {
        const { reactions: reactionsId } = await Question.findOne({
            _id: questionId,
        }).select('-_id reactions');
        return reactionsId;
    },
    async getAuthorIdBy(questionId) {
        const { author: authorId } = await Question.findOne({
            _id: questionId,
        }).select('-_id author');
        return authorId;
    },
    async deleteOne(id) {
        //TODO remove reactions !!!
        return Question.findByIdAndRemove(id);
    },
};
