var PouchDB = require('pouchdb');
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({
  origin: "*"
}));

var pouch = PouchDB.defaults({
  prefix: './db/'
});
app.use('/db', require('express-pouchdb')(pouch));

var todos = new pouch('todos');
var configs = new pouch('configs');

app.listen(3000);
