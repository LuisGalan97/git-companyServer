const mongoose = require('mongoose');
const URI = 'mongodb://localhost/dbEnterprise';

const dbConnect = {};

dbConnect.connect = () => {
     mongoose.connect(URI)
        .then(db => console.log("Conectado a la base de datos!"))
        .catch(err => console.log("No se pudo conectar a la base de datos..."));
}

module.exports = dbConnect; 

