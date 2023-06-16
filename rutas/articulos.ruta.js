const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cors = require('cors');
const { fieldsValidation } = require('../middlewares/fields-validator');
const { check } = require('express-validator');

const { articuloPost,
        articuloGet} = require('../controladores/articulos.controlador');

const { buscarGet } = require('../controladores/articuloBuscar.controlador'); 
 
//ruta de consulta de articulos  
router.get('/articulos/consulta', articuloGet);
router.get('/buscar/:palabra', buscarGet);

//ruta de creacion de articulos con validaciones de campos obligatorios
router.post('/crearArticulo', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
], fieldsValidation, articuloPost);

//ruta de edicion de articulos
//router.put('/articulo/:id', articuloPut)

module.exports = router;