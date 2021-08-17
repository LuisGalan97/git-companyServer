const Empleado = require("../modelo/modelo.empleados");

const empleadoCtrl = {};


empleadoCtrl.createEmpleado = async(req,res) =>{
    const empleado = new Empleado(req.body); //convertir esto en soli
    await empleado.save();
    console.log(empleado);
    res.send({
        'status':'Empleado Created!'
    });
    
};


empleadoCtrl.readEmpleado = async(req,res)=>{
    if(req.params.id==undefined){
        const empleados = await Empleado.find(); //Convertir esto en solicitud
        res.send(empleados);   
    }else{
        const empleado =  await Empleado.findById(req.params.id); //convertir esto en solicitud
        res.send(empleado);
    }
}


empleadoCtrl.updateEmpleado = async(req,res) => {
    const {id} = req.params;
    const empleado = {
        nombre: req.body.nombre,
        posicion: req.body.posicion,
        oficina: req.body.oficina,
        salario: req.body.salario
    };
     await Empleado.findByIdAndUpdate(id,{$set: empleado},{new: true});
     res.json({status:'Empleado Updated!'});

    };


empleadoCtrl.deleteEmpleado = async(req,res)=> {
     await Empleado.findByIdAndRemove(req.params.id);
     res.json({status: 'Empleado Deleted!'})
};

module.exports = empleadoCtrl; //Se exporta hacia employee.routes

//Responsabilidades del controller: validacion de los datos, llama servicios no manipula la base de datos