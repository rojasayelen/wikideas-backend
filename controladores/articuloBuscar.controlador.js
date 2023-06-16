const { response } = require('express');
const fs = require('fs');
const path = require('path');
const Articulo = require('../modelos/articulos.modelo');


//Controlador de busqueda por palabra
//TODO: palabra ="" y palabra no encontrada en bbdd --> error y respuesta

const buscarGet = async (req, res) => {
    try {
      
      
      let consultas = [];
   
      const palabra = req.params.palabra === undefined ? "sdf" : req.params.palabra;
      console.log(palabra, "ingresado en");


      if (palabra === "") {
        res.status(400).send({msg:'debe ingresar una palabra'});
      } else if (palabra !== ""){
       
        const regex = new RegExp(req.params.palabra, 'i'); // Expresión regular para buscar la palabra (insensible a mayúsculas y minúsculas)
      
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
        res.status(200).send({msg: 'consulta ok', consultas});  
      }else {
        res.status(404).send({msg: 'la busqueda no se encuentra en la bbdd'}); 
      }
  
      
    } catch (error) {
      res.status(500).json({ msg: 'Error en la búsqueda', error: error.message });
    }
  }; 


  module.exports = { buscarGet }




