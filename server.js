require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

// configure port & initialize server
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

// DB setup
mongoose.connect('mongodb://localhost/weatherapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
// check DB connection
db.on('error', err => console.error(err));
db.once('open', () => console.log('db connected'));

// setup to accept json
app.use(express.json());

//  serve web app
var buildDir = __dirname + '/build/';
app.use(express.static(buildDir));

// routes
const routes = require('./server/routes');

app.get('/api', (req, res) => res.send('Hello World with Express'));
app.use('/api/users', routes);

app.listen(port, () => console.log('Running app on port ' + port));
