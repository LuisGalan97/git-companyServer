const mongoose = require('mongoose');

const dbConnect = {};

dbConnect.connect = async (url) => {
    return await mongoose.connect(url)
    .then(()=>{
        console.log("conectado a la base de datos");
        return "connected";
    })
    .catch(()=>{
        console.log("no se pudo conectar");
        return "connection fail";
    })
}

module.exports = dbConnect; 