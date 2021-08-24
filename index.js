//---------------------------------- Modulos Externos--------------------------------------------------------------
//const {json} = require('body-parser'); //Ejecutamos el modulo 'body-parser' y adquirimos la desestructuracion de su respuesta (json)
const express = require('express');//Ejecutamos el modulo 'express' y adquirimos su respuesta como un objeto o funcion que otorga derecho de uso de express
const morgan = require('morgan'); //Ejecutamos el modulo 'morgan' y adquirimos su respuesta como un objeto o funcion que otorga derecho de uso de morgan
//------------------------------------- Modulos propios-------------------------------------------------------------
const dbConnect = require('./database/dbConnect');//Ejecutamos el modulo 'database', y adquirimos la desestructuracion de su respuesta(mongoose) probablemente con derechos de uso.
dbConnect.connect();
//--------------------------------------Proceso---------------------------------------------------------------------
const app = express();//En una constante, asignamos la respuesta del llamado de la funcion express, derechos de creacion de un servidor.


//Settings
app.set('port', process.env.PQRT || 3000);  //Utilizando app, como una constante que ya tiene derechos de uso directo de express, para la configuracion del servidor, configuramos el puerto por donde estara el servidor.


// Middlewares                                  
app.use(morgan('dev'))//Se utiliza el modulo morgan, el 'dev' permite especificar que sera en consola
app.use(express.json());

//Routes
app.use("/empleados",require('./modules/empleados/rutas/rutas.empleados')); 
app.use("/adquisiciones",require('./modules/adquisiciones/rutas/rutas.adquisiciones')); 

//Starting the server
const server = app.listen(app.get('port'), ()=> {        //Que escuche el puerto especificado en settings.
    console.log('Server on port', app.get('port'));
});

module.exports= app;


