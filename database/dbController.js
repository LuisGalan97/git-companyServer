const dbController = {};

dbController.create = async (document, model) => {
    const newDocument = new model(document);

    return await newDocument.save()
    .then((data)=>{
        const answer = {status: "succesfull", details: {request: "create", createdDocument: data}}

        return answer;
    })
    .catch((e)=>{
        let error = e.message;
        console.log(error);

        if(error.includes("validation failed")){
            const pos = error.indexOf(":") + 1;
            error = error.substring(pos);
            const data = error.split(",");
            const details = [];

            data.forEach((item)=>{
                details.push({
                    nameValue: item.split(":")[0].trim(),
                    error: item.includes("required") ? "missing value" : "incorrect type value" 
                });
            });

            const answer = {status: "error", details: details}    
            return answer;
        }        
    }); 
}

dbController.read = async (id, model) => {
    const id_object = (id == undefined) ? {} : {"_id": id};
    
    return await model.find(id_object)
    .then((data)=>{
        dataNoId = JSON.parse(JSON.stringify(data));

        dataNoId.forEach((i)=>{
            delete i._id;
        })
    
        const answer = (JSON.stringify(id_object) === JSON.stringify({})) 
        ? {status: "sucessfull", details: {request: "read", readData: data}} 
        : (JSON.stringify(data) === JSON.stringify([]))
        ? {status: "error", details: {request: "readById", id: id, error: "id not found"}} 
        : {status: "sucessfull", details: {request: "readById", id: id, readDocument: dataNoId}}

        return answer;
    })
    .catch((e)=>{
        let error = e.message;
        console.log(error);

        if(error.includes("Cast to ObjectId failed")){
            const answer = {status: "error", details: {id: id, error: "invalid id format"}}
            return answer;
        }
    }); 
}

dbController.update = async (document, model) => {
    return await model.findOneAndReplace({ "_id": document._id }, document)
    
    .then((input)=>{
        const data = (input === null) ? {} : input;

        const documentNoId = JSON.parse(JSON.stringify(document));
        const dataNoId = JSON.parse(JSON.stringify(data));

        delete documentNoId._id;
        delete dataNoId._id;
    
        const answer = (JSON.stringify(data) === JSON.stringify({}))
        ? {status:"error", details: {request: "update", id: document._id, error: "id not found"}} 
        : {status: "sucessfull", details: {request: "update", id: document._id, 
        originalDocument: dataNoId, replacedBy: documentNoId}}

        return answer;
    })
    .catch((e)=>{
        let error = e.message;
        console.log(error);

        if(error.includes("Cast to ObjectId failed")){
            const answer = {status: "error", details: {id: document._id, error: "invalid id format"}}
            return answer;
        }  
        if(error.includes("validation failed")){
            const pos = error.indexOf(":") + 1;
            error = error.substring(pos);
            const data = error.split(",");
            const details = [];

            data.forEach((item)=>{
                details.push({
                    nameValue: item.split(":")[0].trim(),
                    error: item.includes("required") ? "missing value" : "incorrect type value" 
                });
            });

            const answer = {status: "error", details: details}  
            return answer;
        }
    });     
}

dbController.delete = async (id, model) => {
    const id_object = {"_id": id};

    return await model.findByIdAndRemove(id_object)
    .then((input)=>{
        const data = (input === null) ? {} : input;

        const dataNoId = JSON.parse(JSON.stringify(data));

        delete dataNoId._id;
    
        const answer = (JSON.stringify(data) === JSON.stringify({}))
        ? {status:"error", details: {request: "delete", id: id, error: "id not found"}} 
        : {status: "sucessfull", details: {request: "delete", id: id, 
        deletedDocument: dataNoId}}

        return answer;
    })
    .catch((e)=>{
        let error = e.message;
        console.log(error);

        if(error.includes("Cast to ObjectId failed")){
            const answer = {status: "error", details: {id: id, error: "invalid id format"}}
            return answer;
        }  
    });
}

module.exports = dbController;