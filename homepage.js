var sql = require('sql.js');
var db = sql.Database('planets.db');

function showTable(){
	var tr = document.createElement("TR");
	tr.appendChild(createCell("Earth"));
	tr.appendChild(createCell("1"));
	tr.appendChild(createCell("0"));

	planetTable.appendChild(tr);
}

function createCell(data){
	var td = document.createElement("TD");
	td.appendChild(document.createTextNode(data));
	return td;
}

function fetchDataFromSQLiteDB() {
    //var result = db.exec("SELECT * FROM Planets;");
    var output = "test";
   //  if(result.isValid == false) {
   //      output = "Result is not valid, something went wrong";
   //  } else {
   //      while (result.isValid) {
   //          // do something with the result
   //          var name = result.value(0)
   //          var size = result.value(1)
   //          var dist = result.value(2)
   //          var ord = result.value(3)
   //          var desc = result.value(4)
   //          //test.log(id + forename + surname + email + phone)
   //          var para = document.createElement("p");
			// var node = document.createTextNode("This is new.");
			// para.appendChild(node);
   //          result.toNext();
   //      }

    var para = document.createElement("p");
	var node = document.createTextNode(output);
	para.appendChild(node);

	var element = document.getElementById("test");
	element.appendChild(para)

 }