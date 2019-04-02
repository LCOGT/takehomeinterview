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

// Homepage
app.get('/', function (req, res) {
  getTable('SELECT Name, Size, Distance, Ordinality FROM Planets', function(table) {
    res.send(nav + '<h1>Homepage</h1>' + table + clear);
  });
})

// Handle linking to details page for each planet in database.
app.route("/details/:planet").get(function(req, res) {
  planet = req.params.planet;
  // Display details.
  getDetails(planet, function(table) {
    res.send(nav + table);
  });

});

// Allow routing to the form page.
router.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname+'/form.html'));
})

// Handle input of planet form
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
    // Add planet to database
    var query = 'INSERT INTO Planets (Name, Size, Distance, Ordinality, Description) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [input.name, input.size, input.distance, input.ordinality, input.description]);
    var reply = "You have submitted the following to the database..." 
    + JSON.stringify(input);
    // Success! Give user feedback.
    res.send(nav + reply);
  } catch (err) {
    console.error(err.message);
    // Failure :( Give feedback.
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
    // Delete all entries, give feedback to user upon success/failure.
    var query = 'DELETE FROM Planets';
    db.run(query, (err) => {
      if (err) {
        var reply = "Problem clearing the database: " + err.message;
        res.send(nav + reply);
      }
      else {
        console.log('Planet database cleared.');
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

function getTable(query, callback) {
  // open the database
  var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the planets database.');
  });
  db.all(query, (err, rows) => {
    console.log(rows);
    if (rows === undefined || rows.length == 0) {
      callback("Nothing in the database yet. Add a planet!");
    }
    else {
      // Successful access, return in table form.
      callback(json2table(rows));
    }
  });
  // Finally, close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection CLOSED.');
  });
}

function getDetails(planet, callback) {
  // open the database
  var db = new sqlite3.Database('./planets.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the planets database.');
  });

  var query = 'SELECT Description FROM Planets where Name = "' + planet + '"';
  db.all(query, (err, rows) => {
    console.log(rows);
    if (rows === undefined || rows.length == 0) {
      callback("Cannot find information for the planet in the database.");
    }
    else {
      // Format the info and return.
      const desc = rows.map(e => e.Description);
      query = 'SELECT Size, Distance, Ordinality FROM Planets where Name = "' + planet + '"';
      getTable(query, function(table) {
        callback(
          '<h1>'+planet+'</h1>'
          +'<p>'+desc+'</p>'
          + table
          );
      });
    }
  });
  // Finally, close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection CLOSED.');
  });
}

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
