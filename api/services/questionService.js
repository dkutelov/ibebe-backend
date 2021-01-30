const Question = require('../../models/Question');
const Reaction = require('../../models/Reaction');

const questionData = require('../data/questionData');
const reactionData = require('../data/reactionsData');

async function getAll() {
    return await questionData.getAll();
}

async function create(data) {
    const userId = '6012c1dfc6e6967397819a16';
    const reaction = new Reaction({});
    const createdReaction = await reactionData.createOne(reaction);
    const reactionsId = createdReaction._id;
    const question = new Question({
        author: userId,
        ...data,
        reactions: reactionsId,
    });

    return await questionData.createOne(question);
}

async function update(data) {
    const { id, name } = data;
    return await questionData.updateOne(id, { name });
}

async function remove(data) {
    const { id } = data;
    return await questionData.deleteOne(id);
}

async function getOneById(id) {
    const currentQuestion = await questionData.getOneById(id);
    let views = currentQuestion.views;
    views += 1;
    const updatedQuestionWithViews = await questionData.updateOne(id, {
        views,
    });
    return updatedQuestionWithViews;
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getOneById,
};
