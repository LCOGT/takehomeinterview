function newPlanet() {
	var planet = {
		name: document.getElementById("name").value,
		size: document.getElementById("size").value,
		distance: document.getElementById("distance").value,
		ordinality: document.getElementById("ordinality").value,
		comments: document.getElementById("comments").value
	};
	return planet;
}

function fillRowData(data, tr) {
	var td = document.createElement("TD");
	var text = document.createTextNode(data);
	td.appendChild(text);
	tr.appendChild(td);
	return tr;
}

function fillTableRows(planet) {
	var tr = document.createElement("TR");
	tr = fillRowData(planet.ordinality, tr);
	tr = fillRowData(planet.name , tr);
	tr = fillRowData(planet.size + " Earth masses", tr);
	tr = fillRowData(planet.distance + " AU", tr);

	tr.addEventListener("click", function() {
		switchContexts(planet.name);
	});

	planets.appendChild(tr);
}

function initializeTables() {
	for(var planet in window.localStorage) {
		var planetInfo = JSON.parse(localStorage.getItem(planet));
		fillTableRows(planetInfo);	
	}
}

function makeNewPlanet() {
	var planet = newPlanet();
	fillTableRows(planet);
	localStorage.setItem(planet.name, JSON.stringify(planet));
	clearFields();
}

function clearFields() {
	document.getElementById("name").value = "";
	document.getElementById("size").value = "";
	document.getElementById("distance").value = "";
	document.getElementById("ordinality").value = "";
	document.getElementById("comments").value = "";
}

function switchContexts(planetName) {
	document.location = 'detailsPage.html' + '#' + planetName;
}



// ------------------- Code for Details Page ------------------------------------

function populateHtml(planetName) {
	var planetName = window.location.href.split("#")[1]; 
	var planetDetails = JSON.parse(localStorage.getItem(planetName));
	fillHtml(planetDetails);
}

function fillHtml(planetDetails) {
	var body = document.getElementById("detailsPage");	

	var h1 = document.createElement("H1");
	var text = document.createTextNode(planetDetails.name);
	h1.appendChild(text);
	body.appendChild(h1);

	var h3 = document.createElement("H3");
	var text = document.createTextNode(planetDetails.comments);
	h3.appendChild(text);
	body.appendChild(h3);

	var h4 = document.createElement("H4");
	var text = document.createTextNode("Ordinality: " + planetDetails.ordinality);
	h4.appendChild(text);
	body.appendChild(h4);

	var h4 = document.createElement("H4");
	var text = document.createTextNode("Size: " + planetDetails.size + " Earth masses");
	h4.appendChild(text);
	body.appendChild(h4);

	var h4 = document.createElement("H4");
	var text = document.createTextNode("Distance: " + planetDetails.distance + " AU");
	h4.appendChild(text);
	body.appendChild(h4);

}