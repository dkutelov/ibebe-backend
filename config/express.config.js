const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

module.exports = function (app) {
    app.use(morgan('tiny'));

    app.use(cors());
    app.use(express.json()); // to support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
};
