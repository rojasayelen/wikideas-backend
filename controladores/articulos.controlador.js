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
    const palabra = req.params.palabra;

    // Verificar si no se proporcionó ninguna palabra
    if (!palabra) {
      return res.status(404).send({ msg: 'No se especificó ninguna palabra' });
    }

    const regex = new RegExp(palabra, 'i'); // Expresión regular insensible a mayúsculas y minúsculas para buscar la palabra

    let consultas = await Articulo.find({
      $or: [
        { titulo: regex }, // Buscar en el campo "titulo" que coincide con la palabra
        { contenido: regex }, // Buscar en el campo "contenido" que coincide con la palabra
      ],
    });
    
    if (consultas.length === 0) {
      return res.status(404).send({ msg: 'No se encontraron resultados' });
    }
      //ordenando alfabeticamente los resultados de las consultas
      lista = consultas.sort((a, b) => {
        if (a.titulo > b.titulo) {
          return 1;
        } else if (a.titulo === b.titulo) {
          return 0;
        } else {
          return -1;
        }
      }).slice(0, 3);

    res.status(200).send({ msg: 'Consulta exitosa', consultas: lista });
  } catch (error) {
    res.status(500).json({ msg: 'Error en la búsqueda', error: error.message });
  }
};








 

const articuloPut = async (req, res) => {
  try {
    const { titulo, contenido, imagen } = req.body;
    let articulo = await Articulo.findById(req.params.id);
    
    if (!articulo) {
      return res.status(404).send('No se ha podido realizar la petición');
    }

    articulo.titulo = titulo;
    articulo.contenido = contenido;
    articulo.imagen = imagen;

    await articulo.save();

    res.status(200).send(articulo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const ultimosArticulosEditados = async (req, res) => {
  try {
    const fechaActual = new Date();

    const articulos = await Articulo.aggregate([
      {
        $addFields: {
          diferenciaTiempo: {
            $subtract: [fechaActual, '$updatedAt']
          }
        }
      },
      {
        $sort: { diferenciaTiempo: 1 } // Ordenar por la diferencia de tiempo ascendente
      },
      {
        $limit: 3 // Limitar los resultados a 3 artículos
      }
    ]);

    res.status(200).send(articulos);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};



module.exports = {
  articuloPost,
  articuloGet,
  buscarGet,
  articuloPut,
  ultimosArticulosEditados
}
