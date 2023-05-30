const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cors = require('cors');
const { fieldsValidation } = require('../middlewares/fields-validator');
const { check } = require('express-validator');

const { articuloGet, articuloPost } = require('../controladores/articulos.controlador');
 
//ruta de consulta de articulos  
router.get('/articulos', articuloGet);

//ruta de creacion de articulos con validaciones de campos obligatorios
router.post('/crearArticulo', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
], fieldsValidation,articuloPost);

module.exports = router;