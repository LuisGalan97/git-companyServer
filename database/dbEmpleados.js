const Empleado = require("../modules/empleados/modelo/modelo.empleados");

const dbEmpleados = {};


dbEmpleados.readCollection = (query) => {
    return new Promise(async (res, rej) => {
        try { 
            let data = await Empleado.find(query);
            res(data);
        } catch {
            rej(err);
        }        
    });
}

dbEmpleados.insertDocument = (document) => {
    return new Promise((res, rej) => {
        const newDocument = new Empleado(document);
        newDocument.save((err, document) => {
            if (err) {
                return handleError(err);
            }
            res(document);
        });
    });
}


dbEmpleados.modifyDocument = (document) => {
    return new Promise((res, rej) => {
        Empleado.findOneAndUpdate({ "_id": document._id }, document, (err, document) => {
            res(document);
        });
    });
}

dbEmpleados.deleteDocument = (document) => {
    return new Promise((res, rej) => {
        Empleado.findByIdAndRemove({ "_id": document._id }, (err, result) => {
            res(result);
        });
    });
}



module.exports = dbEmpleados;