const sqlite3 = require('sqlite3').verbose();

// opens database
const db = new sqlite3.Database('./server/planet.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the in-file SQlite database');

  // creates planet table if it doesn't exist
  db.run('CREATE TABLE if not exists planets (name TEXT, size INT, distance INT, ordinality INT, description TEXT)', (error) => {
    if (error) console.error(error.message);
    console.log('preparing planets table...');
  });
});


module.exports = {
  // adds planet to database
  addPlanet: (request, response) => {
    db.serialize(() => {
      let sql = 'SELECT Count(name), Count(ordinality) FROM planets WHERE name = ? OR ordinality = ?';

      // check if planet name/ordinality is already stored in db
      db.get(sql, [request.body.name, request.body.ordinality], (err, row) => {
        if (err) console.error(err.message);
        if (row['Count(name)'] === 0 && row['Count(name)'] === 0) {
          sql = 'INSERT INTO planets(name, size, distance, ordinality, description) VALUES(?, ?, ?, ?, ?)';
          const planetData = [
            request.body.name,
            request.body.size,
            request.body.distance,
            request.body.ordinality,
            request.body.description,
          ];

          // stores planetData in db
          db.run(sql, planetData, function callback(error) {
            if (error) console.error(error.message);
            console.log(`New planet has been inserted with rowid ${this.lastID}`);
            response.status(200);
          });
        }
      });
    });
  },

  // grabs all planets from database
  getPlanets: (request, response) => {
    db.all('SELECT * FROM planets;', [], (err, planets) => {
      if (err) console.error(err.message);
      response.status(200).send(planets);
    });
  },
};
