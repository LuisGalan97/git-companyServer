const Adquisicion = require("../modules/adquisiciones/modelo/modelo.adquisiciones");

const dbAdquisiciones = {};


dbAdquisiciones.readCollection = (query) => {
    return new Promise(async (res, rej) => {
        try { 
            let data = await Adquisicion.find(query);
            res(data);
        } catch {
            rej(err);
        }        
    });
}

dbAdquisiciones.insertDocument = (document) => {
    return new Promise((res, rej) => {
        const newDocument = new Adquisicion(document);
        newDocument.save((err, document) => {
            if (err) {
                return handleError(err);
            }
            res(document);
        });
    });
}

dbAdquisiciones.modifyDocument = (document) => {
    return new Promise((res, rej) => {
        Adquisicion.findOneAndUpdate({ "_id": document._id }, document, (err, document) => {
            res(document);
        });
    });
}

dbAdquisiciones.deleteDocument = (document) => {
    return new Promise((res, rej) => {
        Adquisicion.findByIdAndRemove({ "_id": document._id }, (err, result) => {
            res(result);
        });
    });
}



module.exports = dbAdquisiciones;