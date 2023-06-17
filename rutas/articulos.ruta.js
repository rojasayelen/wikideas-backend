const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cors = require('cors');
const { fieldsValidation } = require('../middlewares/fields-validator');
const { check } = require('express-validator');

const { 
    articuloPost,
    articuloGet,
    buscarGet,
    articuloPut,
    ultimosArticulosEditados
  } = require('../controladores/articulos.controlador');
 
//ruta de consulta de articulos  
router.get('/articulos/consulta', articuloGet);
router.get('/articulos/ultimos', ultimosArticulosEditados);
router.get('/buscar/:palabra', buscarGet);
router.get('/buscar/', (req, res) => {
  res.status(404).send({ msg: 'No se especificó ninguna palabra' });
});

//ruta de creacion de articulos con validaciones de campos obligatorios
router.post('/crearArticulo', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
], fieldsValidation, articuloPost);

//ruta de edicion de articulos
router.put('/articulo/:id', [
  check('titulo', 'El titulo es obligatorio').not().isEmpty().isLength({ min: 1 }),
  check('contenido', 'El contenido es obligatorio').not().isEmpty().isLength({ min: 1, max: 1000 }),
], fieldsValidation, articuloPut)

module.exports = router;