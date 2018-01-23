const express = require('express');
const bodyParser = require('body-parser');
const planetContoller = require('./planetController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));


app.get('/planets', planetContoller.getPlanets);
app.post('/addPlanet', planetContoller.tableCheck, planetContoller.addPlanet);


app.listen(3000);
