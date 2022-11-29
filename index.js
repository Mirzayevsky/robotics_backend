const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`${port} started listening...`);
});

module.exports = server;