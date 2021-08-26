const app = require('express')();
require('dotenv').config();

require('./config/express.config')(app);
require('./config/mongoose.config')();

const errorHandler = require('./api/middlewares/errorHandler');
const routes = require('./api/router');

const PORT = process.env.PORT || 5000;

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
