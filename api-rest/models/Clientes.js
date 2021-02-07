const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    documento:{
        type: Number,
        unique: true,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    saldo:{
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = model("Cliente", clienteSchema)