var express = require('express');
var router = express.Router();
var usuarioControler = require('../../controllers/api/usuarioControllersAPI');

router.get('/', usuarioControler.usuarios_list);
router.post('/create', usuarioControler.usuarios_create);
router.post('/reservar', usuarioControler.usuario_reservar);

module.exports = router;

