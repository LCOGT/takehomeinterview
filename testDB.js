const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
var fs = require('fs')
 
// open the database
let db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the planets database.');
});

function getPlanets() {
  var p = "";
  db.serialize(() => {
    db.each(`SELECT * FROM Planets`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.Name + "\t" + row.Size);
      return (row.Name + "\t" + row.Size);
    });
  });
  console.log("Here: ");
  console.log(p);
  return p;
}

app.get('/', function (req, res) {
  try {
    db.all('SELECT * FROM Planets', (err, rows) => {
      console.log(rows);
      const allPlanets = rows.map(e => e.Name);
      console.log(allPlanets);
      res.send(allPlanets);
    });
  } catch (err) {
    console.error(err.message);
  }

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection CLOSED.');
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
