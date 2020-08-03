

var Usuario = require('../models/usuario'); // Importamos el modelo de usuarios...

// Creamos los modulos...

module.exports = {

	// Lista todos los usuarios...
	// Devolviendo toda la lista de usuarios de la base de datos...

	list: function(req, res, next){
		Usuario.find({}, (err, usuarios) => {
			res.render('usuarios/index', {usuarios: usuarios})

			 });

		},

	update_get: function(req, res, next){
		Usuario.findById(req.params.id, function(err, usuario){
			res.render('usuarios/update',{errors:{}, usuario: usuario} );
			});
		},

	update: function(req, res, next){
		var update_values = {nombre: req.body.nombre};

		// Esta funcion busca y actualiza directamente la base de datos...
		// Recibe el parametro con el id y el valor campo : valor a actualizar...

		Usuario.findByIdAndUpdate(req.params.id, update_values, function(err, usuario){

			// Si tenemos un error...	
			if (err){
				console.log("err");  // Error en consola
				res.render('usuario/update', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })});

			}else{
				res.redirect('/usuarios');
				return;
			};

			});

		},	

	create_get: function(req, res, next){
		res.render('usuarios/create', {errors:{}, usuario: new Usuario()});
	},  


	create : function(req, res, next){

		// Preso si el password no coincide...
		if (req.body.password != req.body.confirm_password){
			console.log("create POST, el password no coincide...");
			res.render('usuarios/create', {errors: {confirm_password: {message: 'No coincide el password'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })});
			return;
		}


		// Persistir el usuario

		Usuario.create({nombre: req.body.nombre, email: req.body.email, password: req.body.password}, function(err, nuevousuario){

						console.log(req.body.nombre);
						console.log(err);

						// Si tenemos un error
						if (err) {res.render('usuarios/create', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })});
						}else{

							// Si no tenemos error....
							console.log("Vamos a enviar el correo...");
							nuevousuario.enviar_email_bienvenida();
							res.redirect('/usuarios');
						}

		});



	},

		// Borrado
		delete: function(req, res, next){
			Usuario.findByIdAndDelete(req.body.id, function(err){
				if (err)
					next(err);
				else
					res.redirect('/usuarios');
			});
		},


}







