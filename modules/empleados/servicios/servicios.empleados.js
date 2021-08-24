const mongoose = require("mongoose");
const dbEmpleados = require("../../../database/dbEmpleados");


const serviceEmpleados = {};

serviceEmpleados.listarEmpleados = (id = "") => {
    let query = (id == "") ? {} : { "_id": mongoose.Types.ObjectId(id) }
    return new Promise(async (res, rej) => {
        try {
            let data = await dbEmpleados.readCollection(query);
            res(data);
        } catch (err) {
            rej(err);
        }
    });
}

serviceEmpleados.crearEmpleado = (empleadoData) => {
    return new Promise(async (res, rej) => {
        let empleadoInserted = await dbEmpleados.insertDocument(empleadoData);
        res(empleadoInserted.id);
    })

}

serviceEmpleados.actualizarEmpleado = (empleadoModify) => {
    return new Promise(async (res, rej) => {
        //console.log(productModify)
        let empleadoToModify = await dbEmpleados.modifyDocument(empleadoModify);
        res(empleadoToModify._id);
    })
}

serviceEmpleados.eliminarEmpleado = (empleadoDelete) => {
    return new Promise(async (res, rej) =>{
        let empleadoToDelete = await dbEmpleados.deleteDocument(empleadoDelete);
        res(empleadoToDelete._id);
    });
}

module.exports = serviceEmpleados;
