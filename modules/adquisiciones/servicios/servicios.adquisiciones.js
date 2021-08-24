const mongoose = require("mongoose");
const dbAdquisiciones = require("../../../database/dbAdquisiciones");


const serviceAdquisiciones = {};

serviceAdquisiciones.listarAdquisiciones = (id = "") => {
    let query = (id == "") ? {} : { "_id": mongoose.Types.ObjectId(id) }
    return new Promise(async (res, rej) => {
        try {
            let data = await dbAdquisiciones.readCollection(query);
            res(data);
        } catch (err) {
            rej(err);
        }
    });
}

serviceAdquisiciones.crearAdquisicion = (adquisicionData) => {
    return new Promise(async (res, rej) => {
        let adquisicionInserted = await dbAdquisiciones.insertDocument(adquisicionData);
        res(adquisicionInserted.id);
    })

}

serviceAdquisiciones.actualizarAdquisicion = (adquisicionModify) => {
    return new Promise(async (res, rej) => {
        //console.log(productModify)
        let adquisicionToModify = await dbAdquisiciones.modifyDocument(adquisicionModify);
        res(adquisicionToModify._id);
    })
}

serviceAdquisiciones.eliminarAdquisicion = (adquisicionDelete) => {
    return new Promise(async (res, rej) =>{
        let adquisicionToDelete = await dbAdquisiciones.deleteDocument(adquisicionDelete);
        res(adquisicionToDelete._id);
    });
}

module.exports = serviceAdquisiciones;
