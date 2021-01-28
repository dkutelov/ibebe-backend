const Question = require('../../models/Question');
const Reaction = require('../../models/Reaction');

const questionData = require('../data/questionData');
const dataFactory = require('../data/dataFactory')(Reaction);

async function getAll() {
    return await questionData.getAll();
}

async function create(data) {
    const userId = '6012c1dfc6e6967397819a16';
    const reaction = new Reaction({});
    const createdReaction = await dataFactory.createOne(reaction);
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
    return await dataFactory.updateOne(id, { name });
}

async function remove(data) {
    const { id } = data;
    return await dataFactory.deleteOne(id);
}

async function getOneById(id) {
    return await questionData.getOneById(id);
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getOneById,
};
