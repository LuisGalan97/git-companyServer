const model = require("../model/model.purchases");
const dbController = require("../../../database/dbController");

const purchaseCtrl = {}

purchaseCtrl.create = async (req, res) => {
    const document = req.body; 

    await dbController.create(document, model)
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((e)=>{
        res.status(400).send({status: "database request fail"});
    });  
}

purchaseCtrl.read = async (req, res) => {
    const id = req.params.id;

    await dbController.read(id, model)
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((e)=>{
        res.status(400).send({status: "database request fail"});
    });  
}

purchaseCtrl.update = async (req, res) => {
    const document = req.body;
    document._id = req.params.id;

    await dbController.update(document, model)
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((e)=>{
        res.status(400).send({status: "database request fail"});
    });  
}

purchaseCtrl.delete = async (req, res) => {
    const id = req.params.id;    
    
    await dbController.delete(id, model)
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((e)=>{
        res.status(400).send({status: "database request fail"});
    });   
}

module.exports = purchaseCtrl;

