const errorHandler = (err, req, res) => {
  console.log('error handler', err);
  err.status = err.status || 500;
  err.message = err || err.message || 'Something went wrong';

  res.status(err.status).json({ message: err.message });
};

module.exports = errorHandler;
