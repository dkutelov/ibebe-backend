const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Tag', tagSchema);
