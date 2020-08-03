// Controlador

var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res){

	res.render('bicicletas/index',{bicis: Bicicleta.allBicis});
}

// Esta pagina es en la que se escriben los datos en la pagina
exports.bicicleta_create_get = function(req, res){
	res.render('bicicletas/create');
}

// Este es el controle que recibe el post para guardar los datos, toma los datos del body del formulario
// Creamos un objeto bicicleta
exports.bicicleta_create_post = function(req, res){
	var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
	bici.ubicacion = [req.body.lat, req.body.lng];
	Bicicleta.add(bici); // Llama al metodo bicicleta y guarda los datos...
	console.log("Pasa metodo post");

	res.redirect('/bicicletas');   // Va a la pagina index de bicicleta que es la lista...


}

// Este es el controlador que llama la pagina para borrar una bicicleta

exports.bicicleta_delete_post = function(req, res){
	Bicicleta.removeById(req.body.id);
	res.redirect('/bicicletas');


}

// Esta pagina es en la que se escriben los datos en la pagina para editar
exports.bicicleta_update_get = function(req, res){
	var bici = Bicicleta.findById(req.params.id);
	res.render('bicicletas/update',{bici});
}

// Este es el controle que recibe el post para guardar los datos, toma los datos del body del formulario
// Creamos un objeto bicicleta
exports.bicicleta_update_post = function(req, res){
	
	var bici = Bicicleta.findById(req.params.id);
	bici.id = req.body.id;
	bici.color = req.body.color;
	bici.modelo = req.body.modelo;
	bici.ubicacion = [req.body.lat, req.body.lng];

	res.redirect('/bicicletas');   // Va a la pagina index de bicicleta que es la lista...

}




