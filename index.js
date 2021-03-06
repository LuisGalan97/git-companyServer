const url = 'mongodb://localhost/dbEnterprise';
//---------------------------------- Modulos Externos-----------------------------------
const express = require("express");
const morgan = require("morgan"); 
//------------------------------------- Modulos propios---------------------------------
const dbConnect = require("./database/dbConnect");
dbConnect.connect(url);
//--------------------------------------Proceso-----------------------------------------
const app = express();

//Settings
app.set("port", process.env.PQRT || 3000);  

// Middlewares                                  
app.use(morgan("dev"))
app.use(express.json());

//Routes
app.use("/employees",require("./modules/employees/routes/routes.employees")); 
app.use("/purchases",require("./modules/purchases/routes/routes.purchases")); 

//Starting the server
const server = app.listen(app.get("port"), ()=> {       
	console.log("Server on port", app.get("port"));
});

module.exports= server;


