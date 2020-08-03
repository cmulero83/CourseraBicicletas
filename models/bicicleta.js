// Modelo  para Moongo

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   // Esquema...

// Definimos el esquema...
var bicicletaShema = new Schema({
	code : Number,   //No usar ID, ya que es palabra reservada por mongodb...
	color : String,
	modelo : String,
	ubicacion : {
		type: [Number],index: {type: '2dsphere', sparse: true}  // Decimos que este campo es una lista de numeros, y aue vamos a crear un indice geografico. 
	}
});



//metodo allbicis, que llamaremos como Bicicleta.allBicis
//el parametro cb, es el callback que va a ejecutar...
//static agrega directo al modelo...

bicicletaShema.statics.allBicis = function(cb){
	console.log("Estoy en allBicis...")
	return this.find({},cb);
};

// Crear instalacion, para crear bicicletas
bicicletaShema.statics.createInstance = function(code, color, modelo, ubicacion){
	return new this({
		code : code,
		color : color,
		modelo : modelo,
		ubicacion: ubicacion
	});
};

// Añadir una bicicleta, push, añade la bicicleta al array de bicis...
bicicletaShema.statics.add = function(aBici, cb){
	this.create(aBici, cb);
};

// Medoto buscar por codigo
bicicletaShema.statics.findByCode = function(aCode, cb){
	return this.findOne({code: aCode},cb);
};

// Metodo remove...
bicicletaShema.statics.removeByCode = function(aCode, cb){
	console.log(aCode);	
	return this.deleteOne({code: aCode}, cb);
};

bicicletaShema.method.toString = function(){
	return 'id:' + this.id + " | color: " + this.color;

};



// Vamos a exportar el modelo, que llamamos Bicicleta y el modelo esta en bicicletaShema...
module.exports = mongoose.model('Bicicleta',bicicletaShema);



