const empleadoServices = require("../servicios/servicios.empleados");

const empleadoCtrl = {};


empleadoCtrl.createEmpleado = async(req,res) =>{
    console.log("llegué a crear empleados")
    const empleadoData = req.body;
    if (empleadoData.nombre == undefined || empleadoData.posicion == undefined || empleadoData.oficina == undefined || empleadoData.salario == undefined || empleadoData.nombre == "" || empleadoData.posicion == "" || empleadoData.oficina == "" || empleadoData.salario == "") {
        res.status(200).send({ error: "Por favor, rectifique la información ingresada" })
        return
    }
    let empleadoCreated = await empleadoServices.crearEmpleado(empleadoData);
    res.status(200).send({ productId: empleadoCreated });    
};


empleadoCtrl.readEmpleado = async(req,res)=> {
    console.log(req.params.id)
    empleadoServices.listarEmpleados(req.params.id).then((data) => {
        res.status(200).send(data)

    }).catch((error) => {
        res.status(400).send(error)
    });
}


empleadoCtrl.updateEmpleado = async(req,res) => {
    console.log("Actualizar empleado")
    const empleadoToModify = req.body;
    empleadoToModify._id = req.params.id;
    if (empleadoToModify._id == undefined || empleadoToModify.nombre == undefined || empleadoToModify.posicion == undefined || empleadoToModify.oficina == undefined || empleadoToModify.salario == undefined || empleadoToModify._id == "" || empleadoToModify.nombre == "" || empleadoToModify.posicion == "" || empleadoToModify.oficina == "" || empleadoToModify.salario == "") {
        res.status(200).send({ error: "Por favor, rectifique la información ingresada" })
        return
    }
    //console.log(product_to_modify)
    let modifiedEmpleado = await empleadoServices.actualizarEmpleado(empleadoToModify);
    res.status(200).send({ productId: modifiedEmpleado})

};


empleadoCtrl.deleteEmpleado = async(req,res)=> {
    const empleadoToDelete = req.body;
    empleadoToDelete._id = req.params.id;
    if (empleadoToDelete._id == undefined || empleadoToDelete._id == "") {
        res.status(200).send({ error: "Por favor, rectifique la información ingresada" })
        return
    }
    let eliminatedEmpleado = await empleadoServices.eliminarEmpleado(empleadoToDelete);
    res.status(200).send({ productId: eliminatedEmpleado })
};

module.exports = empleadoCtrl; //Se exporta hacia employee.routes

//Responsabilidades del controller: validacion de los datos, llama servicios no manipula la base de datos




