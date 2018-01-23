const express = require('express');
const bodyParser = require('body-parser');
const planetContoller = require('./planetController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/homePage'));
app.use('/details', express.static('client/detailsPage'));

app.get('/planets', planetContoller.getPlanets);
app.post('/', planetContoller.addPlanet);


// start server
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App is listening at http://%s:%s', host, port);
});
