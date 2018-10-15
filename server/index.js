const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
require('dotenv').config(path.join(__dirname, '/../.env'));
const controller = require('../database');

const DIST_DIR = path.join(__dirname, '../client/dist/');

const app = express();
app.use(bodyParser.json());
app.use(express.static(DIST_DIR));


app.get('/store-list', (req, res) => {
  controller.findAllStores((error, results) => {
    if (error) {
      console.error('ERROR findAllStores query failed', error);
    } else {
      res.send(results);
    }
  });
});

app.get('/stores/:id', (req, res) => {
  controller.findStore(req.params.id, (error, results) => {
    if (error) {
      console.error('ERROR findStore query failed');
    } else {
      res.send(results);
    }
  });
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
