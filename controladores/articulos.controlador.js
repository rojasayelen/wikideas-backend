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
      if (!articuloStored) {
        res.status(404).send('no se ha podido realizar la petiticion');
      } else {
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
//TODO: palabra ="" y palabra no encontrada en bbdd --> error y respuesta

const buscarGet = async (req, res) => {
  try {
    let consultas = [];
    const regex = new RegExp(req.params.palabra, 'i'); // Expresión regular para buscar la palabra (insensible a mayúsculas y minúsculas)
    const palabra = req.params.palabra;

    if (!palabra) {
      res.status(404).send({msg: 'Not Found'});
    } else if (palabra ) {
      consultas = await Articulo.find(
        {
          $or: [
            { titulo: regex }, // Buscar en el campo "titulo" que coincida con la palabra
            { contenido: regex }, // Buscar en el campo "contenido" que coincida con la palabra
          ],
        },
      );
    //ordenando alfabeticamente los resultados de las consultas
      const lista = consultas.sort((a, b) => {
        if (a.titulo > b.titulo ) {
          return 1;
        } else if (a.titulo == b.titulo){
          return 0;
        }else {
          return -1;
        }
      })
      
    }

    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la búsqueda', error: error.message });
  }
}; 

const articuloPut = async (req, res = response) => {
  // try {
  //   const { titulo, contenido, imagen } = req.body;
  //   let articulo = await Articulo.findId(req.params.id);
  //   if (!articulo) {
  //     res.status(404).send('no se ha podido realizar la petiticion');
  //   }

  //   Articulo.titulo = titulo;
  //   Articulo.contenido = contenido;
  //   Articulo.imagen = imagen;

  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send(error);
  // }
  const { id } = req.params;
  console.log(id, 'este es el id');
  const { imagen, fecha, ...data } = req.body;

  const articulo = await Articulo.findByIdAndUpdate(
    
    id, data, { new: true });
    console.log(articulo, 'este es el articulo');

    res.json(articulo);
}

module.exports = {
  articuloPost,
  articuloGet,
  buscarGet,
  articuloPut
}
