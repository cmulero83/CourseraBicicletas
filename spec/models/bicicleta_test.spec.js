
// NOTA : Se requiere iniciarlizar el servidor para cada prueba..


var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing bicicletas', function(){

	beforeEach(function(done){
		var mongoDB = 'mongodb://localhost/test';
		mongoose.connect(mongoDB, { useNewUrlParser: true });

		//Conexion a la base de datos

		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open',function(){
			console.log('Tenemos una conexion a la base de datos test');
			done();
		});
	});


	// Borra la base...
/*
	afterEach(function(done){
		Bicicleta.deleteMany({}, function(err, success){
			if (err) console.log(err);
			done();
		});
	});

*/

	// Metodo de prueba crear instancia...
	describe('Bicicleta.createInstance', ()=> {
		it('Crea una instancia de bicileta', ()=> {
			var bici = Bicicleta.createInstance(1, "verde", "urbana", [-19.3778188,99.177106]);
			
			expect(bici.code).toBe(1);
			expect(bici.color).toBe("verde");
			expect(bici.modelo).toBe("urbana");
			expect(bici.ubicacion[0]).toEqual(-19.3778188);
			expect(bici.ubicacion[1]).toEqual(99.177106);
			 
		});

	});


	// Comprobar allbicis
	describe ('Bicicleta.allBicis', () => {
		it('Que comience vaica', (done) => {
			Bicicleta.allBicis(function(err, bicis){

				expect(bicis.length).toBe(0);
				done();

			})
		})
	})

	// Comprobar la creacion de una bicicleta
	describe('Bicicleta.add', () => {
		it('Agregar solo una bici',(done)=>{

			var aBici = Bicicleta.createInstance({code: 1, color:"test", modelo:"urbana"});
			
			Bicicleta.add(aBici, function(err, newBici){
				if (err) console.log(err);
				Bicicleta.allBicis(function(err, bicis){
					console.log('bicis code' + bicis.code);
					console.log('aBici code' + aBici.code);
					expect(bicis.length).toBe(1);
					//expect(bicis.code).toBe(aBici.code);
					done();
				});
			});
		});
	});

	// Prueba del remove....
	describe('Bicicleta.removeByCode', () => {
		it('Eliminar una bici',(done)=>{


			Bicicleta.removeByCode(1, function(err, success){
				// Callback
				console.log("Estoy en el callback de renoveByCode...");

				if (err) console.log(err);

					done();
				

			});	
		});
	});


	// Prueba de findByCode
	describe('Bicicleta.findByCode', () => {
		it('Debe de buscar la bici con code 1', (done) => {

			// Comprobar que la base esta vacia...
			Bicicleta.allBicis(function(err, bicis){
				expect(bicis.length).toBe(0);

				// Añadir bicicletas...
				var aBici = new Bicicleta({code:1, color: "morado", modelo:"urbana"});
				Bicicleta.add(aBici, function(err, newBici){
					if (err) console.log(err);

					var aBici2 = new Bicicleta({code:2, color: "azul", modelo:"urbana"});
					Bicicleta.add(aBici2, function(err, newBici){
						if (err) console.log(err);

						Bicicleta.findByCode(1, function(error, targetBici){
							expect(targetBici.code).toBe(aBici.code);

							done();

						});
					});
				});

			});

		});
	});

});

