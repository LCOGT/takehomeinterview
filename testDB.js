const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
var fs = require('fs')

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
    // open the database
    var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the planets database.');
    });
    db.all('SELECT * FROM Planets', (err, rows) => {
      console.log(rows);
      // const allPlanets = rows.map(e => e.Name);
      // console.log(allPlanets);
      var table = json2table(rows, 'PlanetTable');
      var nav = '<div class="nav">'
      + '<div>'
      +  '<ul>'
          +'<li><a href="/">Home</a></li>'
          +'<li><a href="/form">Add a Planet</a></li>'
        +'</ul>'
      +'</div>'
    +'</div>';
      res.send(nav + table);
    });
  } catch (err) {
    console.error(err.message);
  }

  // Finally, close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection CLOSED.');
  });
})

// Allow routing to the form page.
router.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname+'/form.html'));
})


function json2table(json, classes) {
  var cols = Object.keys(json[0]);  
  var headerRow = '';
  var bodyRows = '';
  
  classes = classes || '';

  // Create the column headers
  cols.map(function(col) {
    headerRow += '<th>' + col + '</th>';
  });

  // Create a row for each element in JSON obj
  json.map(function(row) {
    bodyRows += '<tr>';

    // Place value for each element in the row
    cols.map(function(colName) {
      bodyRows += '<td>' + row[colName] + '</td>';
    })

    bodyRows += '</tr>';
  });

  return '<table class="' +
         classes +
         '"><thead><tr>' +
         headerRow +
         '</tr></thead><tbody>' +
         bodyRows +
         '</tbody></table>';
}

// Add the router to the webapp.
app.use('/', router);
app.listen(3000, function () {
  console.log('Planet web app listening on port 3000');
})
