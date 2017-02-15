                                                                                                                                                    
var createStatement = "CREATE TABLE IF NOT EXISTS Planets (id INTEGER PRIMARY KEY AUTOINCREMENT, planetName TEXT, planetOrdinality INTEGER, planetDistance REAL, planetSize REAL, pl\
anetDescription TEXT)";

var selectAllStatement = "SELECT * FROM Planets";

var insertStatement = "INSERT INTO Planets (planetName, planetOrdinality, planetDistance, planetSize, planetDescription) VALUES (?, ?, ?, ?, ?)";

var dropStatement = "DROP TABLE Planets";

var db = openDatabase("PlanetIndex", "1.0", "Planet Index", 200000);                                                                                       

var dataset;

var DataType;

function initDatabase()                                                                                                                         

{

    try {

        if (!window.openDatabase)                                                                                                      

        {

            alert('SQLite is not supported in this browser!');

        }

        else {

            createTable();                                                                                            

        }

    }
    catch (e) {

        if (e == 2) {

                                                                                                                                         

            console.log("Invalid SQLITE version.");

        } else {

            console.log("Unknown ERROR" + e + "!");

        }

        return;

    }

}

function createTable()                                                                                                                     

{

    db.transaction(function (tx) { tx.executeSql(createStatement, [], showEntry, onError); });

}

function insertEntry()                                                                    

{

    var planetNameTemp = $('input:text[id=planetName]').val();

    var planetOrdinalityTemp = $('input:text[id=planetOrdinality]').val();

    var planetDistanceTemp = $('input:text[id=planetDistance]').val();

    var planetSizeTemp = $('input:text[id=planetSize]').val();

    var planetDescriptionTemp = $('input:text[id=planetDescription]').val();


    db.transaction(function (tx) { tx.executeSql(insertStatement, [planetNameTemp, planetOrdinalityTemp, planetDistanceTemp, planetSizeTemp, planetDescriptionTemp], loadAndReset, o\
nError); });

                                                              

}


function dropTable()                                                                                 

{

    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showEntry, onError); });

    resetForm();

    initDatabase();

}

function loadEntry(i)                                                                                               

{

    var item = dataset.item(i);

    $("#planetName").val((item['planetName']).toString());

    $("#planetOrdinality").val((item['planetOrdinality']).toString());

    $("#planetDistance").val((item['planetDistance']).toString());

    $("#planetSize").val((item['planetSize']).toString());

    $("#planetDescription").val((item['planetDescription']).toString());

    $("#id").val((item['id']).toString());

}

function resetForm()                                                                                                                     

{

    $("#planetName").val("");

    $("#planetOrdinality").val("");

    $("#planetDistance").val("");

    $("#planetSize").val("");

    $("#planetDescription").val("");

    $("#id").val("");

}

function loadAndReset()                                                                                                                            

{

    resetForm();

    showEntry()

}

function onError(tx, error)                                                                                                                

{

    alert(error.message);

}

function showEntry()                                                                                               

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<li>' + item['planetName'] + '</br>' + item['planetDescription']  + '</br>' + 'Ordinality: '+ item['planetOrdinality'] + '</br>' + 'Distance: \
' + item['planetDistance'] + ' AU'  + '</br>' + 'Size: ' + item['planetSize'] + ' Earth Masses' + '</li>' + '</br>';

                $("#results").append(linkeditdelete);

            }

        });

    });

}

$(document).ready(function ()                                                                                                         

                  {
                      ;

                      $("body").fadeIn(2000);                                                                                                     

                      initDatabase();

                      $("#btnAddPlanet").click(insertEntry);                                                                           

                      $("#btnReset").click(resetForm);

                      $("#btnDrop").click(dropTable);

                  });




  
  
  
  
