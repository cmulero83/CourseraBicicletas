
var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
	Bicicleta.allBicis(function(err, bicis){
		console.log(bicis.length);
		res.status(200);
		res.json({
			bicis
		});
	});
};

// Creacion de la nueva bicicleta...

exports.bicicleta_create = function(req, res){
	
	var aBici = Bicicleta.createInstance();

	aBici.code= req.body.id;
	aBici.color = req.body.color;
	aBici.modelo = req.body.modelo;

	Bicicleta.add(aBici, function(err, newBici){
		if (err) console.log(err);
		res.status(200).json({
			newBici
		});
	});

};

// Borrado de la bicicleta y devolvermos 204 (no hay contenido en la respuesta)

exports.bicicleta_delete = function(req, res){
	Bicicleta.removeByCode(req.body.id);
	res.status(204).send();
};




