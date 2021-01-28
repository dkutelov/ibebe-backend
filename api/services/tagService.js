const Tag = require('../../models/Tag');

const dataFactory = require('../data/dataFactory')(Tag);

async function getAll() {
    return await dataFactory.getAll();
}

async function create(data) {
    const { name } = data;
    const tag = new Tag({ name });
    return await dataFactory.createOne(tag);
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
    return await dataFactory.getOneById(id);
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getOneById,
};
