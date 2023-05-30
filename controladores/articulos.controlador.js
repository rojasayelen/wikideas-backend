const { response } = require('express');
const fs = require('fs');
const path = require('path');
const Articulo = require('../modelos/articulos.modelo');

//controlador de creacion de articulos
const articuloPost = async (req, res) => {
    const params = req.body;
    
    // Validar params
    try {
        
        let validar_titulo = !validator.isEmpty(params.titulo) &&
                                validator.isLength(params.titulo, {min: 5, max: undefined});
        let validar_contenido = !validator.isEmpty(params.contenido);

        if (!validar_titulo || !validar_contenido) {
                throw new Error('Invalid');
        }    
    }catch(err){
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'});
    }
    // crear el articulo segun los parametros requeridos por el Body
    const articulo = new Articulo({params});

   try{
    // Guardar el articulo en la bbdd
    articulo.save().then((articuloStored) => {
        if(!articuloStored){
            res.status(404).send('no se ha podido realizar la petiticion');
        }else{
            res.status(200).send({
                status: 'success',
                articulo:articuloStored,
                mesaje: "Articulo en la bbdd"
            });
        }    
    });
    } 
    catch (error) {
        res.status(500).send(error);   
    }
}

//controlador de consultas 
const articuloGet = async (req, res = response) => {

    // res.send({message: 'probando get'});
};

module.exports = { articuloGet, articuloPost}