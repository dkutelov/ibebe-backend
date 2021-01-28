const app = require('express')();
require('dotenv').config();

require('./config/express.config')(app);
require('./config/mongoose.config')();
const routes = require('./api/router');

const PORT = process.env.PORT || 5000;

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
