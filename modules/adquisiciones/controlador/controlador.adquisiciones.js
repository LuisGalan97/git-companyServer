const adquisicionServices = require("../servicios/servicios.adquisiciones");

const adquisicionCtrl = {};


adquisicionCtrl.createAdquisicion = async(req,res) =>{
    console.log("llegué a crear adquisiciones")
    const adquisicionData = req.body;
    if (adquisicionData.nombre == undefined || adquisicionData.valorUnidad == undefined || adquisicionData.cantidad == undefined || adquisicionData.area == undefined || adquisicionData.vidaUtilAños == undefined || adquisicionData.nombre == "" || adquisicionData.valorUnidad == "" || adquisicionData.cantidad == "" || adquisicionData.area == "" || adquisicionData.vidaUtilAños == "") {
        res.status(200).send({ error: "Por favor, rectifique la información ingresada" })
        return
    }
    let adquisicionCreated = await adquisicionServices.crearAdquisicion(adquisicionData);
    res.status(200).send({ productId: adquisicionCreated });    
};


adquisicionCtrl.readAdquisicion = async(req,res)=> {
    console.log(req.params.id)
    adquisicionServices.listarAdquisiciones(req.params.id).then((data) => {
        res.status(200).send(data)

    }).catch((error) => {
        res.status(400).send(error)
    });
}


adquisicionCtrl.updateAdquisicion = async(req,res) => {
    console.log("Actualizar adquisicion")
    const adquisicionToModify = req.body;
    adquisicionToModify._id = req.params.id;
    if (adquisicionToModify._id == undefined || adquisicionToModify.nombre == undefined || adquisicionToModify.valorUnidad == undefined || adquisicionToModify.cantidad == undefined || adquisicionToModify.area == undefined || adquisicionToModify.vidaUtilAños == undefined || adquisicionToModify._id == "" || adquisicionToModify.nombre == "" || adquisicionToModify.valorUnidad == "" || adquisicionToModify.cantidad == "" || adquisicionToModify.area == "" || adquisicionToModify.vidaUtilAños == "") {
        res.status(200).send({ error: "Por favor, rectifique la información ingresada" })
        return
    }
    //console.log(product_to_modify)
    let modifiedAdquisicion = await adquisicionServices.actualizarAdquisicion(adquisicionToModify);
    res.status(200).send({ productId: modifiedAdquisicion});

};


adquisicionCtrl.deleteAdquisicion = async(req,res)=> {
    const adquisicionToDelete = req.body;
    adquisicionToDelete._id = req.params.id;
    if (adquisicionToDelete._id == undefined || adquisicionToDelete._id == "") {
        res.status(200).send({ error: "Por favor, rectifique la información ingresada" })
        return
    }
    let eliminatedAdquisicion = await adquisicionServices.eliminarAdquisicion(adquisicionToDelete);
    res.status(200).send({ productId: eliminatedAdquisicion });
};

module.exports = adquisicionCtrl; //Se exporta hacia employee.routes

//Responsabilidades del controller: validacion de los datos, llama servicios no manipula la base de datos



