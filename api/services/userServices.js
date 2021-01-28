const User = require('../../models/User');

const dataFactory = require('../data/dataFactory')(User);

async function getAll() {
    return await dataFactory.getAll();
}

async function create(data) {
    const user = new User(data);
    return await dataFactory.createOne(user);
}

async function update(data) {
    const { id, props } = data;
    return await dataFactory.updateOne(id, props);
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
