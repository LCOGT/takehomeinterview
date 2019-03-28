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