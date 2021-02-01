function getUserReactionType(userId, reactions) {
    let userReactionType = null;
    Object.keys(reactions)
        .filter((r) => {
            return Array.isArray(reactions[r]);
        })
        .forEach((r) => {
            const hasReaction = reactions[r].find(
                (uid) => String(uid) === userId
            );
            if (hasReaction) {
                userReactionType = r;
            }
        });
    return userReactionType;
}

module.exports = {
    getUserReactionType,
};
