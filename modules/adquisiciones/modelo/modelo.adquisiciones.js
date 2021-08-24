const mongoose = require('mongoose');
const { Schema } = mongoose;


const AdquisicionSchema = new Schema({
    nombre: {type: String, required: false},
    valorUnidad: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    area: {type: String, required: true},
    vidaUtilAños: {type: Number, required: true}
});

module.exports = mongoose.model('Adquisicion', AdquisicionSchema);//Se exporta hacia employe.controller