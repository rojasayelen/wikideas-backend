const {Schema, model } = require('mongoose');

const ArticuloSchema = new Schema({
    titulo: {
        type: String,
        require: [true, 'El título es obligatorio']
    },
    contenido: {
        type: String,
        require: [true, 'El contenido del artículo es requerido']
    },
    imagen: {
        type: String
    },
    fecha: {
            type: Date
    },
    createdAt: {
            type: Date
    },
    updatedAt: {
            type: Date
    }
});

module.exports = model('Articulo', ArticuloSchema); 