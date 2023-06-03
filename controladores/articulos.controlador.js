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


//Controlador para listar todos los documentos
const articuloGet = async (req, res = response) => {
  try {	
    const articulos = await Articulo.find();
        res.status(200).send(articulos);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);        
 };
}

//Controlador de busqueda por palabra
const buscarGet = async (req, res) => {
  try {
    console.log('Consulta de búsqueda:', req.params.palabra); // Verifica el valor del parámetro de búsqueda

    let consultas = [];
    if (req.params.palabra) {
      const regex = new RegExp(req.params.palabra, 'i'); // Expresión regular para buscar la palabra (insensible a mayúsculas y minúsculas)

      consultas = await Articulo.find(
        {
          $or: [
            { titulo: regex }, // Buscar en el campo "titulo" que coincida con la palabra
            { contenido: regex }, // Buscar en el campo "contenido" que coincida con la palabra
          ],
        },
      ).sort({ fecha: -1 });
      
    }

    console.log('Consulta MongoDB:', consultas); // Verifica el valor de las consultas de MongoDB

    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la búsqueda', error: error.message });
  }
};



















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
