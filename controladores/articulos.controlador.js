const { response } = require('express');
const fs = require('fs');
const path = require('path');
const Articulo = require('../modelos/articulos.modelo');


//controlador de creacion de articulos
const articuloPost = async (req, res) => {
   
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


//controlador de consultas
const articuloGet = async (req, res = response) => {


    // res.send({message: 'probando get'});
};


module.exports = { articuloGet, articuloPost}
