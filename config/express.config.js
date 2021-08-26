const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { auth } = require('../api/middlewares/auth');

module.exports = function (app) {
  app.use(morgan('tiny'));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.use(auth());
};
