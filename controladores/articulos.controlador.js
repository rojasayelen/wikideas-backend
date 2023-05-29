const { response } = require('express');
const fs = require('fs');
const path = require('path');
const Articulo = require('../modelos/articulos.modelo');

const articuloGet = async (req, res = response) => {

    res.send({message: 'probando get'});
};

const articuloPost = async (req, res) => {
    //res.send({message: 'probando post'});
   try {
    const params = req.body;
    const articulo = new Articulo({ 
        titulo: params.titulo,
        contenido: params.contenido,
        imagen: params.imagen,
        fecha: params.fecha
    });
   
    articulo.save().then((articuloStored) => {
        if(!articuloStored){
            res.status(404).send('no se ha podido realizar la petiticion');
        }else{
            res.status(200).send(articuloStored);
        }    
    });
    } catch (error) {
        res.status(500).send(error);   
    }
}

module.exports = { articuloGet, articuloPost}