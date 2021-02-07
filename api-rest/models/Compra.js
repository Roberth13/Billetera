const { Schema, model } = require('mongoose');

const compraSchema = new Schema({
    token: String,
    estado: Number,
    valor: {
        type: Number,
        required: true
    },
    id_cliente: {
        type: Schema.ObjectId, 
        ref: 'clientes',
        required: true
    }
})

module.exports = model("Compra", compraSchema)