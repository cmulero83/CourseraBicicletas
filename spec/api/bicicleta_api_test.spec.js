//
// Vamos a testear el API
//

// Importamos la libreria request

var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www")
var base_url = 'http://localhost:3000/api/bicicletas'
var mongoose = require("mongoose");

describe("Bicicleta API", ()=> {

	beforeEach(function(done){
		var mongoDB = 'mongodb://localhost/red_bicicletas';
		mongoose.connect(mongoDB,{useNewUrlParser:true});

		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'conexion error'));
		db.once('open',function(){
			console.log("conectados a la base de datos...");
			done();
		});
	});


	afterEach(function(done){
		Bicicleta.deleteMany({},function(err, success){
			if (err) console.log(err);
			done()
		});
	});


/*
			// Comprobar que la base esta vacia...
			Bicicleta.allBicis(function(err,bicis){
				expect(bicis.length).toBe(0);

				done();
*/

	describe('Bicicleta.fidByCode', () => {
		it('Debe devolver la bici con code 101', (done) => {
			Bicicleta.allBicis(function(err,bicis){
				expect(bicis.length).toBe(0);

				//
				// Vamos a crear dos bicicletas...
				//

				var aBici = new Bicicleta({code: 101, color: "verde", modelo: "urbana"});
				Bicicleta.add(aBici, function(err, newBici){
					if (err) console.log(err);

					var aBici2 = Bicicleta({code: 980, color: "magenta", modelo: "montaña"});
					Bicicleta.add(aBici2, function(err, newBici){
						if (err) console.log(err);

						//
						// Vamos a buscar ahora la bicicleta...
						//

						Bicicleta.findByCode(101, function(error, targetBici){
							console.log("Comprobando Bicicleta.fidByCode");
							expect(targetBici.code).toBe(aBici.code);
							expect(targetBici.color).toBe(aBici.color);
							expect(targetBici.modelo).toBe(aBici.modelo);
							done();

						});

					});
				});



			});
		});
	});



	describe('POST BICICLETAS /create', () => {
		it('STATUS 200', (done) => {
			var headers = {'Content-Type':'application/json'};
			var aBici = '{"id":13330,"color":"rojo","modelo":"urbana"}';
	
			// Hacemos el request que vamos a recibir desde la web...	
			request.post({
				headers: headers,
				url: 'http://localhost:3000/api/bicicletas/create',
				body: aBici
			},function(error, response, body){
				console.log("Comprobando Bicicleta.create");
				expect(response.statusCode).toBe(200);
				var bici = JSON.parse(body);
				expect(bici.newBici.color).toBe("rojo");
				done();


		});

	});
});


});

