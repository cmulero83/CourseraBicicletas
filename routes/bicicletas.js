// Usamos modulo de rutas de express

var express = require('express');
var router = express.Router();

// Añadimos el controlador
// Cuando llamemos a la pagina aparecera el listado de bicicletas

var bicicletaController = require('../controllers/bicicleta');
router.get('/', bicicletaController.bicicleta_list);

// Añadir la ruta añadir bicicletas, cuando es GET, llama al metodo bicicleta_create_get, que esta en el controler
// cuando pones /create, de lanzan estos metodos...
router.get('/create', bicicletaController.bicicleta_create_get);

// Este metodo guarda, se llama al metodo que esta en controler....
router.post('/create', bicicletaController.bicicleta_create_post);

// Ruta para el deteted
router.post('/:id/delete', bicicletaController.bicicleta_delete_post);

// Ruta de actualizacion
router.get('/:id/update', bicicletaController.bicicleta_update_get)

// Ruta de actualizacion
router.post('/:id/update', bicicletaController.bicicleta_update_post)

module.exports = router;



