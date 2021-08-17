const Adquisicion = require("../modelo/modelo.adquisiciones");

const adquisicionCtrl = {};


adquisicionCtrl.createAdquisicion = async(req,res) =>{
    const adquisicion = new Adquisicion(req.body); //convertir esto en soli
    await adquisicion.save();
    console.log(adquisicion);
    res.send({
        'status':'Adquisicion Created!'
    });
    
};

adquisicionCtrl.readAdquisicion = async(req,res)=>{
    if(req.params.id==undefined){
        const adquisiciones = await Adquisicion.find(); //Convertir esto en solicitud
        res.send(adquisiciones);   
    }else{
        const adquisicion =  await Adquisicion.findById(req.params.id); //convertir esto en solicitud
        res.send(adquisicion);
    }
}


adquisicionCtrl.updateAdquisicion = async(req,res) => {
    const {id} = req.params;
    const adquisicion = {
        nombre: req.body.nombre,
        valorUnidad: req.body.valorUnidad,
        cantidad: req.body.cantidad,
        area: req.body.area,
        vidaUtilAños: req.body.vidaUtilAños
    };
     await Adquisicion.findByIdAndUpdate(id,{$set: adquisicion},{new: true});
     res.json({status:'Adquisicion Updated!'});

    };


adquisicionCtrl.deleteAdquisicion = async(req,res)=> {
     await Adquisicion.findByIdAndRemove(req.params.id);
     res.json({status: 'Adquisicion Deleted!'})
};

module.exports = adquisicionCtrl; //Se exporta hacia employee.routes

//Responsabilidades del controller: validacion de los datos, llama servicios no manipula la base de datos