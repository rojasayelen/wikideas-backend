const { Schema, model } = require('mongoose');

const CategSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es requerido']
    }
})

module.exports = model('Categoría', CategSchema);