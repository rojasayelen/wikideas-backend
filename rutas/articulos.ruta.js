const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { articuloGet, articuloPost } = require('../controladores/articulos.controlador');
const cors = require('cors');

// const router = Router();

router.get('/articulos', articuloGet);
router.post('/crearArticulo', articuloPost);

module.exports = router;