const model = require("../model/model.employees");
const dbController = require("../../../database/dbController");

const employeeCtrl = {}

employeeCtrl.create = async (req, res) => {
    const document = req.body; 

    await dbController.create(document, model)
    .then((data)=>{
        res.status(200).send(data);
    })
}

employeeCtrl.read = async (req, res) => {
    const id = req.params.id;

    await dbController.read(id, model)
    .then((data)=>{
        res.status(200).send(data);
    })  
}

employeeCtrl.update = async (req, res) => {
    const document = req.body;
    document._id = req.params.id;

    await dbController.update(document, model)
    .then((data)=>{
        res.status(200).send(data);
    })  
}

employeeCtrl.delete = async (req, res) => {
    const id = req.params.id;    
    
    await dbController.delete(id, model)
    .then((data)=>{
        res.status(200).send(data);
    })  
}

module.exports = employeeCtrl;





