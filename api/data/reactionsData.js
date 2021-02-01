const Reaction = require('../../models/Reaction');

module.exports = function (model) {
    async function getByParent(id) {
        return await model
            .findOne({ _id: id })
            .populate('reactions')
            .select('reactions')
            .lean();
    }

    async function addUserIdToReaction(id, propName, newItem) {
        return await Reaction.findOneAndUpdate(
            { _id: id },
            { $push: { [propName]: newItem } },
            {
                new: true,
                useFindAndModify: false,
            }
        );
    }

    async function removeUserIdFromReaction(id, propName, userId) {
        return await Reaction.findOneAndUpdate(
            { _id: id },
            { $pull: { [propName]: userId } },
            {
                new: true,
                useFindAndModify: false,
            }
        );
    }

    async function removeOtherReaction(reactionsId, userId, otherReactionsArr) {
        const removeSelectors = {};

        otherReactionsArr.forEach((k) => {
            removeSelectors[k] = userId;
        });

        await Reaction.updateOne(
            { _id: reactionsId },
            {
                $pull: removeSelectors,
            },
            { useFindAndModify: false },
            (err, result) => {
                if (err) console.log('err', err);
            }
        );
    }
    async function getAllReactions(reactionsId) {
        const reactions = await Reaction.findOne({
            _id: reactionsId,
        });
        return { ...reactions.numbers, votes: reactions.votes };
    }

    return {
        getByParent,
        addUserIdToReaction,
        removeOtherReaction,
        removeUserIdFromReaction,
        getAllReactions,
    };
};
