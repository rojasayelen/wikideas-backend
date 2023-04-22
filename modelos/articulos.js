const {Schema, model } = require('mongoose');

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        require: [true, 'El título es obligatorio']
    },
    cuerpo: {
        type: String,
        require: [true, 'El contenido del artículo es requerido']
    }
})

module.exports = ('Articulo', ArticuloSchema); 