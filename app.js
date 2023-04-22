const mongo  = require("./configuracion/mongo");
const express = require("express")
const cors = require("cors")


// iniciar app
console.log("App de node arrancada");


// Conectar a base de datos
mongo();

// Crear servidor de node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// convertir body a objeto js
app.use(express.json()); // recibir datos con content- type app/json
app.use(express.urlencoded({extended:true})); // form-url-encoer



// Crear servidores y escuchar peticiones http
app.listen(puerto, () => {
    console.log("servidor corriendo en el puerto: "+ puerto);
});