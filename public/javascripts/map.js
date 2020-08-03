
var map = L.map('map').setView([19.37, -99.17],14);
 
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'test', maxZoom: 18}).addTo(map);

L.marker([19.37, -99.17]).addTo(map);
L.marker([19.364, -99.1894]).addTo(map);
L.marker([19.3798, -99.1876]).addTo(map);


// Recorremos todos los marker y le ponemos como titulo su ID
// Revisar....

$.ajax({
	dataType: "json",
	url: "api/bicicletas",
	success: function(result){
		console.log(result);
		result.bicicletas.forEach(function(bici){
			L.marker(bici.ubicacion, {title: bici.id}).addTo(map);	
		});
	}
})
