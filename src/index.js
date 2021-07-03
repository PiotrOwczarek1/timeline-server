const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');
const bearerToken = require('express-bearer-token');
const oktaAuth = require('./auth');

const connection = mysql.createConnection({
  host     : 'powczarek.online',
  user     : 'powczarek',
  password : 'Password1@',
  database : 'powczarek'
});

connection.connect();

const port = process.env.PORT || 9999;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
