//const { createEmpleado } = require("../controlador/controlador.empleados");

//En proceso...

/*const supertest = require("supertest");
const app = require("../../../index");
const assert = require("chai").assert;

const request  = supertest(app);


describe("testear empleados",()=>{
    it("getEmpleado",()=>{
        request.get("/empleados")
        .then((data)=>{
            console.log(data.body);
            //assert.exists(data.body);
            //assert.deepEqual(data.body, null);
        });
    });   
});


/*superobject.post("/empleados").send({
            name:"Matias",
            position:"Developer",
            office:"Miami",
            salary:70000
        }).then((data)=>{
            assert.exists(data.body);
            assert.deepEqual(data.body, {'status':'Employee saved'});
        })
        console.log("testeando"); */