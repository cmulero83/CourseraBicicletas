//
// Test para el modulo de usuario...
//

var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

/*
	Testeando usuarios...
*/

describe('Testeando usuarios', function(){

	// Antes de iniciar la prueba...
	beforeEach(function(done){
		var mongoDB = 'mongoDB://localhost/testdb';
		mongoose.connect(mongoDB, { useNewUrlParser: true });
		const db = mongoose.connection;

		db.on('error', console.error.bind(console, 'Conexion error'));
		db.on('open', function(){
			console.log("Estamos conectados a la base de datos de pruebas...");
			done();
		});

	});


	// Despues de terminar la prueba...
	afterEach(function(done){

		// Borramos toda la base de datos...

		Reserva.deleteMany({}, function(err, success){
			if (err) console.log(err);
			Usuario.deleteMany({}, function(err, success){
				if (err) console.log(err);
				Bicicleta.deleteMany({}, function(err, success){
					if (err) console.log(err);
					done();
				});
			})
		});

	});

	//
	// Test para realizar una reserva
	//

	describe('Cuando se realiza la reserva de una bici', ()=> {
		it('Comprobamos que debe existir la reserva', (done)=>{

			// Creamos un usario...
			const usuario = new Usuario({nombre: "Liska"});
			usuario.save()

			// Creamos una bicicleta...
			const bicicleta = new Bicicleta({code:1, color:"verde", modelo:"urbana"});
			bicicleta.save()

			// Ya tenemos un usuario y una bicicleta, vamos realizar la reserva...
			var hoy = new Date();
			var manana = new Date();
			manana.setDate(hoy.getDate()+1);

			usuario.reservar(bicicleta.id, hoy, manana, function(err, reserva){
				Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
					console.log(reservas[0]);
					expect(reservas.lenght).toBe(1);
					expect(reservas[0].bicicleta.code).toBe(1);
					done();
				});
			});
		});
	});


});
