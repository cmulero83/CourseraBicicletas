// Modelo de usuario

var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');


const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10; // Constante de salto de encriptacion...

const Token = require('../models/token');
const nodemailer = require('nodemailer');

var Schema = mongoose.Schema;


// Valida si el dato de correo electronico es correcto...
const validateEmail = function(email) {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(email);
};

// Crea el esquema de la base de datos...
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true, // Indicamos que quite espacios por delante y por detras...
        required: [true, "El nombre es requerido"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "El correo electronico es requerido"],
        lowcase: true,
        unique: true, // Esto no esta definido en mongo, usamos una herramienta externa, NPM MOONGOSE-UNIQUE-VALIDATOR --SAVE
        validate: [validateEmail, "For favor increse un email valido"],
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/] // Comprueba que el email es correcto... 

    },

    password: {
        type: String,
        trim: true,
        required: [true, "El password es requerido"]
    },

    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false,
    }

});

//
// Plugin de validacion UNIQUE
//

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario' });


//
// pre, lo que indica es que antes del save, se realiza lo que indique function...
//

usuarioSchema.pre('save', function(next) { // TERMINAR ........ TERMINAR ......... TERMINAR ............


    // Comprabamos que el password cambio
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
        next();
    }


});

usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// Crea el metodo de alta de reserva....
usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this.id, bicicleta: biciId, desde: desde, hasta: hasta });
    console.log(reserva);
    reserva.save(cb);
};

// Enviar email de bienvenida...
usuarioSchema.methods.enviar_email_bienvenida = function(cb) {

    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;

    token.save(function(err) {
        if (err) { return console.log(err.message); }


        //Generar el servicio SMTP con la cuenta de ethereal.email
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Fallo la creacion del est en la cuenta' + err.message);
                return process.exit(1);
            }

            // Si no tenemos error, seguimos para obtener las credenciales...

            console.log('Credenciales obtenidas...');

            // Crear datos de la conexion...
            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'grayce.wisoky91@ethereal.email',
                    pass: 'jPSQmHGsVJZSWhc3sR'
                }

            });


            // Creamos el mensaje (objeto)

            let message = {
                from: 'cmulero83@icloud.com',
                to: 'grayce.wisoky91@ethereal.email',
                subject: 'Nodemailr is unicode friendly',
                text: 'Hola mundo...',
                html: '<p><b>Hola</b> mundo...</p>'
            };



            // Realizamos el envio...
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Ocurrio un error', +err.message);
                    return process.exit(1);
                }

                console.log('Mensaje enviado:  %s ', info.messageId);
                // Solo si se enviar a traves de Ethereal acount
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });


        })







    });



}


module.exports = mongoose.model('usuario', usuarioSchema)