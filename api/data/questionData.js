const Question = require('../../models/Question');

module.exports = {
    async getAll(options = {}) {
        return await Question.find(options);
    },
    async createOne(newItem) {
        return await newItem.save();
    },
    async updateOne(id, updatedProps) {
        return await Question.findByIdAndUpdate(
            id,
            { $set: updatedProps },
            { new: true }
        );
    },
    async getOneById(id) {
        return await Question.findById(id)
            .populate('category')
            .populate('reactions')
            .populate('tags');
    },
    async deleteOne(id) {
        // remove reactions !!!
        return Question.findByIdAndRemove(id);
    },
};
