module.exports = function dataFactory(model) {
  async function getAll(options = {}) {
    return await model.find(options);
  }

  async function createOne(newItem) {
    const item = await newItem.save();
    return item;
  }

  async function updateOne(id, updatedProps) {
    return await model.findByIdAndUpdate(
      id,
      { $set: updatedProps },
      { new: true },
    );
  }

  async function updateAddToArray(id, propName, newItem) {
    return await model.findByIdAndUpdate(
      id,
      { $push: { [propName]: newItem } },
      {
        new: true,
        useFindAndModify: false,
      },
    );
  }

  async function getOneById(id) {
    return await model.findById(id);
  }

  async function deleteOne(id) {
    return model.findByIdAndRemove(id);
  }

  return {
    createOne,
    updateOne,
    getAll,
    getOneById,
    deleteOne,
    updateAddToArray,
  };
};
