// Importar dependencias
const mongo = require("./configuracion/mongo");
const express = require("express");
const cors = require("cors")

const { articulos } = require('./helpers/articulos');

// Mensaje de bienvenida
console.log("Api node para pruebas");

// Conexion a la base de datos
//mongo();

// Crear servidor node
const app = express();
const puerto = 3900;

// configurar cors 
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Llamando a las rutas
// app.use('/api', require('./rutas/articulos.ruta'));
app.get('/', (req, res) => {
    res.send('probando get desde el server');
});

app.get('/api/articulos/:titulo', (req, res)=>{
    const titulo = req.params.titulo;
    const consulta = articulos.filter(articulos => articulos.titulo === titulo);
    
    if (consulta.length ===0){
        return res.status(404).send(`No se encontro el articulo ${consulta}`);
    }
        res.status(200).send(JSON.stringify(consulta));
});

// Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor de Node corriendo en el puerto:", puerto)
});

