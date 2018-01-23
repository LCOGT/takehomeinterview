const express = require('express');
const bodyParser = require('body-parser');
const planetContoller = require('./planetController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/homePage'));
app.use('/details', express.static('client/detailsPage'));


app.get('/planets', planetContoller.getPlanets);
app.post('/', planetContoller.tableCheck, planetContoller.addPlanet);


app.listen(3000);
