const sqlite3 = require('sqlite3').verbose();

// opens database
const db = new sqlite3.Database('./server/planet.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the in-file SQlite database');
});

module.exports = {
  // checks if planets table exists; if not it will create a planets table
  tableCheck: (request, response, next) => {
    db.run('SELECT * FROM planets', (err) => {
      if (err) {
        if (err.message === 'SQLITE_ERROR: no such table: planets') {
          console.log('creating table...');
          db.run('Create TABLE planets (name TEXT, size INT, distance INT, ordinality INT, description TEXT)');
          response.status(200);
          next();
        } else console.error(err.message);
      }
      next();
    });
  },

  // adds planets to database
  addPlanet: (request, response) => {
    const sql = 'INSERT INTO planets(name, size, distance, ordinality, description) VALUES(?, ?, ?, ?, ?)';
    const planetData = [
      request.body.name,
      request.body.size,
      request.body.distance,
      request.body.ordinality,
      request.body.description,
    ];

    db.run(sql, planetData, function callback(err) {
      if (err) console.error(err.message);
      console.log(`New planet has been inserted with rowid ${this.lastID}`);
      response.status(200);
    });
  },
};
