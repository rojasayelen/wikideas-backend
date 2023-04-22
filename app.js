// Importar dependencias
const mongo = require("./configuracion/mongo");
const express = require("express");
const cors = require("cors")

// Mensaje de bienvenida
console.log("Api node para red social Arrancada!!");


// Conexion a la base de datos
mongo();

// Crear servidor node
const app = express();
const puerto = 3900;

// configurar cors 
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor de Node ocrriendo en el puerto:", puerto)
});