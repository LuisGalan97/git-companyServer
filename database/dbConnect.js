const mongoose = require('mongoose');
const URI = 'mongodb://localhost/dbEnterprise';


const dbConnect = {};

dbConnect.connect = () => {
     mongoose.connect(URI)
        .then(db => console.log('DB is connected'))
        .catch(err => console.error(err));
}



module.exports = dbConnect; //Se exporta hacia la base de datos?

//Desarrollo enfocado a test -> Por cada codigo que coloque, debo probarlo
//nyc
