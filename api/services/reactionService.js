const Question = require('../../models/Question');

const questionData = require('../data/questionData');
const reactionsData = require('../data/reactionsData')(Question);

async function handleReaction(questionId, type) {
    // pull out the question and the existng reactions obj
    const userId = '601584fdb4b9cd3586c3141a';
    //const userId = '6012c1dfc6e6967397819a16';
    let reactions;

    // check if author -> do nothing
    const authorId = await questionData.getAuthorIdBy(questionId);
    if (userId === String(authorId)) {
        return { message: "You can't react on your own question" };
    }

    if (type) {
        let { reactions: reactionsObj } = await reactionsData.getByParent(
            questionId
        );

        const { _id: reactionsId } = reactionsObj;
        const otherReactionNames = Object.keys(reactionsObj).filter((r) => {
            return r !== '_id' && r !== '__v' && r !== type;
        });

        await reactionsData.removeOtherReaction(
            reactionsId,
            userId,
            otherReactionNames
        );

        const alreadyHasReaction = reactionsObj[type]
            .map((x) => String(x))
            .includes(userId);

        if (!alreadyHasReaction) {
            await reactionsData.addUserIdToReaction(reactionsId, type, userId);
        } else {
            await reactionsData.removeUserIdFromReaction(
                reactionsId,
                type,
                userId
            );
        }

        reactions = await reactionsData.getAllReactions(reactionsId);
    }
    return reactions;
}

module.exports = {
    handleReaction,
};
