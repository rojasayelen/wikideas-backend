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
        type: String,
    },
    fecha: {
            type: Date,
            default: Date.now
    },  
}, 
{ timestamps: true },
);

module.exports = model('Articulo', ArticuloSchema); 