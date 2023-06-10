// Importar dependencias
const mongo = require("./configuracion/mongo");
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida
console.log("Api node para pruebas");

// Conexion a la base de datos
//mongo();

// Crear servidor node
const app = express();
const port = process.env.PORT || 3900;

// configurar cors 
app.use(cors());
// app.use(
//     cors({
//       origin: 'http://wikideas-andreadev5.vercel.app',
//       methods: 'GET,POST',
//       allowedHeaders: 'Content-Type,Authorization',
//     })
//   );

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
const router = express.Router();
//app.use('/api', require('./rutas/articulos.ruta'));

//conexion con el front  
// app.get('/api/data', (req, res) => {
//     const data = { message: 'Hola desde el backend!' };
//     res.json(data);
//   });

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>Node JS y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto backend en vercel</h1>
      </body>
    </html>`;
  res.send(htmlResponse);  
});

// Poner servidor a escuchar peticiones http
app.listen(port, () => {
    console.log(`Servidor de Node corriendo en http://localhost:${port}`)
});

