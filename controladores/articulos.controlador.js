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


//Listar todos los documentos
const articuloGet = async (req, res = response) => {
  try {	
    const articulos = await Articulo.find();
        res.status(200).send(articulos);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);        
 };
}


const buscarGet =  async (req, res) =>{
  try{
    let consultas;
    if (req.query.q) {
      consultas = await Articulo.find(
        {$text: {
          $search: req.query.q
        }},
        {
          score: { $meta: 'textScore' } //Score clasifica los resultados desde el que mas se ajusta a su buscada hasta el que menos
        }
      ).sort({
        score: { $meta: 'textScore' }
      })
    }
    res.status(200).send(consultas);
  }catch {
    res.status(500).json({msg: 'error en la busqueda'});
  }
}



const articuloPut = async (req, res = response) => {
  try {
    const { titulo, contenido, imagen } = req.body;
    let articulo = await Articulo.findId(req.params.id);
      if(!articulo) {
        res.status(404).send('no se ha podido realizar la petiticion');
      }

      Articulo.titulo = titulo;
      Articulo.contenido = contenido;
      Articulo.imagen = imagen;

    } catch (error) {
    console.log(error);
        res.status(500).send(error);
  }
}

module.exports = { 
  articuloPost,
  articuloGet, 
  buscarGet,
  articuloPut 
}
