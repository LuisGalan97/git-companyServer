const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    name: {type: String, required: true},
    unitPrice: {type: Number, required: true},
    amount: {type: Number, required: true},
    section: {type: String, required: true},
    usefulLife: {type: Number, required: true}
}, { versionKey: false });

module.exports = mongoose.model('Purchase', purchaseSchema);//Se exporta hacia employe.controller