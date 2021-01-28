module.exports = {
    urlValidator: function (v) {
        const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        return v == null || v.trim().length < 1 || re.test(v);
    },
};
