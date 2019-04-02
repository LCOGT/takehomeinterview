const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
var fs = require('fs')

app.use(express.urlencoded());

// HTML for a "navigation" bar
const nav = '<div class="nav">'
              + '<div>'
              +  '<ul>'
                  +'<li><a href="/">Home</a></li>'
                  +'<li><a href="/form">Add a Planet</a></li>'
                +'</ul>'
              +'</div>'
            +'</div>';

// HTML for a clear database button.
const clear = '<form action="/cleared" method="GET"><button>Clear Database</button></form>'

app.get('/', function (req, res) {
  try {
    // open the database
    var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the planets database.');
    });
    var query = 'SELECT Name, Size, Distance, Ordinality FROM Planets';
    db.all(query, (err, rows) => {
      console.log(rows);
      if (rows === undefined || rows.length == 0) {
        res.send(nav + "Nothing in the database yet. Add a planet!");
      }
      else {
        var table = json2table(rows);
        res.send(nav + table + clear);
      }
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

// Handle linking to details page for each planet in database.
app.route("/details/:planet").get(function(req, res) {
  planet = req.params.planet;
  var query = 'SELECT * FROM Planets where Name = "' + planet + '"';

  try {
    // open the database
    var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the planets database.');
    });
    db.all(query, (err, rows) => {
      console.log(rows);
      var table = json2table(rows);
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

});

// Allow routing to the form page.
router.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname+'/form.html'));
})

router.post('/form', function (req, res) {
  var input = req.body;
  console.log(input);

  try {
    // open the database
    var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the planets database.');
    });
    var query = 'INSERT INTO Planets (Name, Size, Distance, Ordinality, Description) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [input.name, input.size, input.distance, input.ordinality, input.description]);
    var reply = "You have submitted the following to the database..." 
    + JSON.stringify(input);
    res.send(nav + reply);
  } catch (err) {
    console.error(err.message);
    var reply = "Error inputting to database: " + err.message;
    res.send(nav + reply);
  }
})

app.get('/cleared', function (req, res) {
  try {
    // open the database
    var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the planets database.');
    });
    var query = 'DELETE FROM Planets';
    db.run(query, (err) => {
      if (err) {
        var reply = "Problem clearing the database: " + err.message;
        res.send(nav + reply);
      }
      else{
        var reply = "Database successfully cleared."
        res.send(nav + reply);
      }
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

function json2table(json) {
  var cols = Object.keys(json[0]);  
  var headerRow = '';
  var bodyRows = '';
  
  // Create the column headers
  cols.map(function(col) {
    headerRow += '<th>' + col + '</th>';
  });

  // Create a row for each element in JSON obj
  json.map(function(row) {
    bodyRows += '<tr>';

    // Place value for each element in the row
    cols.map(function(colName) {
      // Make planet name linkable
      if (colName == "Name") {
        bodyRows += '<td><a href="/details/' + row[colName] + '">' + row[colName] + '</a></td>';
      } else {
        // Otherwise just input data
        bodyRows += '<td>' + row[colName] + '</td>';
      }
    })
    bodyRows += '</tr>';
  });

  return '<table><thead><tr>' +
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
