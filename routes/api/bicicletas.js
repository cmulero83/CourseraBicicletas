// Usamos modulo de rutas de express

var express = require('express');
var router = express.Router();

// Añadimos el controlador
// Cuando llamemos a la pagina aparecera el listado de bicicletas

var bicicletaController = require('../../controllers/api/bicicletaControllersAPI');

router.get('/',bicicletaController.bicicleta_list);

// routa para el metodo de creacion de bicicletas
router.post('/create',bicicletaController.bicicleta_create);

// ruta para el metodo de borrado de las bicicletas

router.get('/delete',bicicletaController.bicicleta_delete);

module.exports = router;