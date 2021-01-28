const Category = require('../../models/Category');

const dataFactory = require('../data/dataFactory')(Category);

async function getAll() {
    return await dataFactory.getAll();
}

async function create(data) {
    const { name } = data;
    const category = new Category({ name });
    return await dataFactory.createOne(category);
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
