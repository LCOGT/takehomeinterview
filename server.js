/*
server for planet database web application
LCO take-home interview project
Danny Bazo
April 2017

requires planet_db.txt, a local file used as a database which should exist but be empty initially
requires boilerplate.html, which contains the non-changing part of the home page
requires node.js
run with 'node server.js', then visit local port 8080 in a browser
*/

var http = require('http');
var fs = require('fs');
var qs = require('querystring')

var server = http.createServer(handleRequest);
server.listen(8080);
console.log('Server started on port 8080');


function handleRequest(req, res) {
/* either sends the client to the home page or a detail page, or else handles input */
    
    if (req.method == 'GET') {
        var requestedURL = req.url;
        if (requestedURL == '/') {
            displayHomePage(res);
        } else {
            // look for requested url name in list of planets, return 404 if not found
            displayDetailPage(requestedURL, res);
        }
    }
    
    // handle the user's input form submission
    else if (req.method == 'POST') {
        processInputForm(req, res);
    }
}


function displayHomePage(res) {
/* shows the home page with input forms and existing planet table */
    
    // first load the existing planets from the database
    var planets = [];
    fs.readFile('./planet_db.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        console.log('loading from file: ', data);
        if (data.length > 0) {
            planets = JSON.parse(data);
        }
    });
    
    // then add the loaded planet table entries to the boilerplate html
    fs.readFile('./boilerplate.html', 'utf-8', function(err, data) {
        if (err) throw err;
        if (planets.length > 0) {
            // fill in table of planets
            for (var i = 0; i < planets.length; i++) {
                data += ('<tr>');
                data += ('<td>' + planets[i].ordinality + '</td>');
                data += ('<td><a href=' + planets[i].name + '.html>' + planets[i].name + '</a></td>');        
                data += ('<td>' + planets[i].size + '</td>');
                data += ('<td>' + planets[i].distance + '</td>');
                data += ('</tr>\n');
            }
        }
    
        // then finish the html
        data += '\n\n</table></body></html>';
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}


function processInputForm(req, res) {
/* grabs the planet data from the POST request */
    
    // accumulate form data until complete
    var receivedData = '';
    req.on('data', function(chunk) {
        receivedData += chunk;                                                                 
        // watch for too much data
        if (receivedData.length > 1e6)
            req.connection.destroy();
    });
    
    // finished getting form data, parse it and add it to the database
    req.on('end', function() {
        var post = qs.parse(receivedData);
        var planetToAdd = {'name':post.pname, 'ordinality':post.pordinality, 'size':post.psize, 'distance':post.pdistance, 'description':post.pdescription};
        console.log('submitted: ', planetToAdd);
        
        // open database file
        fs.readFile('./planet_db.txt', 'utf-8', function(err, data) {
            if (err) throw err;

            // handle initializing empty database
            if (data.length > 0) {
                planets = JSON.parse(data);
            } else {
                planets = [];
            }
            
            // check for proper formatting/range for inputs
            var vresult = testValidity(planets, planetToAdd);
            if (vresult.valid == false) {
                failInput(res, vresult.reason);
                return;
            }
            
            // format things appropriately and update the database with the new planet
            planetToAdd.ordinality = parseInt(planetToAdd.ordinality);
            planetToAdd.size = parseFloat(planetToAdd.size);
            planetToAdd.distance = parseFloat(planetToAdd.distance);
            planets.push(planetToAdd);
            text = JSON.stringify(planets);
            fs.writeFile('./planet_db.txt', text, function(err) {
                if (err) throw err;
                console.log('appended new planet to database');

                // when all done, reload the page to show new data
                displayHomePage(res);
            });
        });
    });
}


function displayDetailPage(req, res) {
/* shows the detail page for a planet entry in the database */
    
    console.log("seeking: ", req);
    
    // strip leading slash and trailing .html, leaving only planet name
    req = req.substring(1, req.length-5);
    
    // load up the database and look for req as a planet name
    fs.readFile('./planet_db.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        var planets = [];
        if (data.length > 0) {
            planets = JSON.parse(data);
        }
        var p;
        for (var i = 0; i < planets.length; i++) {
            
            // found it, generate a small detail page and serve it
            if (planets[i].name == req) {
                p = planets[i];
                var toWrite = '<!DOCTYPE html><html><head><title>' + p.name + '</title></head><body><h1>' + p.name + '</h1>';
                toWrite += '<p>' + p.description + '</p><br> Ordinality: ' + p.ordinality;
                toWrite += '<br>Size: ' + p.size + ' Earth Masses<br>Distance: ' + p.distance + ' AU<br></body></html>';
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': toWrite.length
                });
                res.write(toWrite);
                res.end();
                return;
            }
        }
        
        // if we got here: url was not found
        var r = "bad url";
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Content-Length': r.length
        });
        res.write(r);
        res.end();
    });
}


function testValidity(planets, planetToAdd) {
/* check for appropriateness of planet parameters */
    
    var validityTestResult = {"valid":true, "reason":""};
    
    if ((planetToAdd.name.length == 0) || (/^[a-z0-9]+$/i.test(planetToAdd.name) == false)) {
        validityTestResult.reason = "bad planet name";
        validityTestResult.valid = false;
        return validityTestResult;
    }
    for (var p = 0; p < planets.length; p++) {
        if (planets[p].name == planetToAdd.name) {
            validityTestResult.reason = "planet name exists";
            validityTestResult.valid = false;
            return validityTestResult;
        }
        if (parseInt(planets[p].ordinality) == parseInt(planetToAdd.ordinality)) {
            validityTestResult.reason = "planet ordinality exists";
        validityTestResult.valid = false;
        return validityTestResult;
        }
    }
    if (!isInteger(planetToAdd.ordinality) || (planetToAdd.ordinality < 1)) {
        validityTestResult.reason = "bad planet ordinality";
        validityTestResult.valid = false;
        return validityTestResult;
    }
    if (!isFloat(planetToAdd.size) || (planetToAdd.size <= 0)) {
        validityTestResult.reason = "bad planet size";
        validityTestResult.valid = false;
        return validityTestResult;
    }
    if (!isFloat(planetToAdd.distance) || (planetToAdd.distance <= 0)) {
        validityTestResult.reason = "bad planet distance";
        validityTestResult.valid = false;
        return validityTestResult;
    }
    
    // if we got here the input is valid
    return validityTestResult;
}


function failInput(res, reason) {
/* return a 400 with a short error explanation */
    
  var r = "error: " + reason;
  res.writeHead(400, {
      'Content-Type': 'text/html',
      'Content-Length': r.length
  });
  res.write(r);
  res.end();
}


function isInteger(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}


function isFloat(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}