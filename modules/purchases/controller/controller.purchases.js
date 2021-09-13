const model = require("../model/model.purchases");
const dbController = require("../../../database/dbController");

const purchaseCtrl = {}

purchaseCtrl.create = async (req, res) => {
    const document = req.body; 

    await dbController.create(document, model)
    .then((data)=>{
        res.status(200).send(data);
    })
}

purchaseCtrl.read = async (req, res) => {
    const id = req.params.id;

    await dbController.read(id, model)
    .then((data)=>{
        res.status(200).send(data);
    })
}

purchaseCtrl.update = async (req, res) => {
    const document = req.body;
    document._id = req.params.id;

    await dbController.update(document, model)
    .then((data)=>{
        res.status(200).send(data);
    }) 
}

purchaseCtrl.delete = async (req, res) => {
    const id = req.params.id;    
    
    await dbController.delete(id, model)
    .then((data)=>{
        res.status(200).send(data);
    })
}

module.exports = purchaseCtrl;

