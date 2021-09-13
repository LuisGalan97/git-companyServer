const supertest = require("supertest");
const server = require("../index");
const assert = require("chai").assert;

const testCtrl = {}

const request  = supertest(server);

testCtrl.testCrud = (moduleName, url, objectPost, objectPut) => {
    describe(`test ${moduleName} crud`, ()=>{
        let id;
        let postedItem;
        let postedItemNoId;
        let putItem;
    
        it("post", async () => {
            await request.post(url)
            .send(objectPost)
            .expect(200)
            .expect((res)=>{
                assert.deepEqual(res.body.status, "successfull");
                assert.deepEqual(res.body.details.request, "create");
                assert.exists(res.body.details.createdDocument);

                id = res.body.details.createdDocument._id;
                postedItem = JSON.parse(JSON.stringify(res.body.details.createdDocument));
                postedItemNoId =  JSON.parse(JSON.stringify(res.body.details.createdDocument));
                delete postedItemNoId._id;

                assert.deepEqual(postedItemNoId, objectPost);
            });   
        });
        
        it("get", async ()=>{
           await request.get(url)
           .expect(200)
           .expect((res)=>{
                assert.deepEqual(res.body.status, "successfull");
                assert.deepEqual(res.body.details.request, "read");
                assert.exists(res.body.details.readData);

                const gotData = JSON.parse(JSON.stringify(res.body.details.readData));
                const gotItem = JSON.parse(JSON.stringify(gotData[gotData.length-1]));     
               
                assert.deepEqual(gotItem, postedItem);
           });          
        });   

        it("getById", async ()=>{
            await request.get(`${url}/${id}`)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "successfull");
                 assert.deepEqual(res.body.details.request, "readById");
                 assert.deepEqual(res.body.details.id, id);
                 assert.exists(res.body.details.readDocument);

                 const gotItem = JSON.parse(JSON.stringify(res.body.details.readDocument[0]));  
                 
                 assert.deepEqual(gotItem, postedItemNoId);
            });          
         });   
    
        it("put", async () => {       
            await request.put(`${url}/${id}`)
            .send(objectPut)
            .expect(200)
            .expect((res)=>{
                assert.deepEqual(res.body.status, "successfull");
                assert.deepEqual(res.body.details.request, "update");
                assert.deepEqual(res.body.details.id, id);
                assert.exists(res.body.details.originalDocument);
                assert.exists(res.body.details.replacedBy);

                const originalItem = JSON.parse(JSON.stringify(res.body.details.originalDocument));
                putItem = JSON.parse(JSON.stringify(res.body.details.replacedBy)); 
                
                assert.deepEqual(originalItem, postedItemNoId);
                assert.deepEqual(putItem, objectPut);
            });   
        });
    
        it("delete", async () => {       
            await request.del(`${url}/${id}`)
            .expect(200)
            .expect((res)=>{
                assert.deepEqual(res.body.status, "successfull");
                assert.deepEqual(res.body.details.request, "delete");
                assert.deepEqual(res.body.details.id, id);
                assert.exists(res.body.details.deletedDocument);

                const deletedItem = JSON.parse(JSON.stringify(res.body.details.deletedDocument));

                assert.deepEqual(deletedItem, putItem);
            })   
        });
    });
}

testCtrl.testErrors = (moduleName, url, objectTest) => {
    describe(`test ${moduleName} error`, ()=>{
        
        const objectError = JSON.parse(JSON.stringify(objectTest));
        console.log(objectError);
        console.log(Object.entries(objectError));

        Object.entries(objectError).forEach((i)=>{
            objectError[i[0]] = (typeof i[1] === "number") ? "mustBeNumber" : "";    
        });

        console.log(objectError);

        it("post", async () => {
            await request.post(url)
            .send(objectError)
            .expect(200)
            .expect((res)=>{
                assert.deepEqual(res.body.status, "error");
                assert.deepEqual(res.body.details.request, "create");
                assert.exists(res.body.details.error);

                const errors = res.body.details.error;

                errors.forEach((i)=>{
                    const original = (typeof objectTest[i.nameValue] == "number") 
                                        ? "incorrect type value" : "missing value";

                    assert.deepEqual(i.reason, original);
                });              
            });   
        });   

        it("getById invalid", async ()=>{
            const id = "55";
            await request.get(`${url}/${id}`)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "error");
                 assert.deepEqual(res.body.details.request, "readById");
                 assert.deepEqual(res.body.details.id, id);
                 assert.deepEqual(res.body.details.error, "invalid id format" );    
            });          
         });
         
         it("getById missing", async ()=>{
            const id = "6540099741fb5d62ecf7d8a4";
            await request.get(`${url}/${id}`)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "error");
                 assert.deepEqual(res.body.details.request, "readById");
                 assert.deepEqual(res.body.details.id, id);
                 assert.deepEqual(res.body.details.error, "id not found" );    
            });          
         });
         
         it("put values test", async () => {       
            const id = "6540099741fb5d62ecf7d8a4";
            await request.put(`${url}/${id}`)
            .send(objectError)
            .expect(200)
            .expect((res)=>{
                assert.deepEqual(res.body.status, "error");
                assert.deepEqual(res.body.details.request, "update");
                assert.deepEqual(res.body.details.id, id);
                assert.exists(res.body.details.error);

                const errors = res.body.details.error;

                errors.forEach((i)=>{
                    const original = (typeof objectTest[i.nameValue] == "number") 
                                        ? "incorrect type value" : "missing value";

                    assert.deepEqual(i.reason, original);
                });      
            });   
        });
        
        it("put Id invalid test", async ()=>{
            const id = "55";
            await request.put(`${url}/${id}`)
            .send(objectTest)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "error");
                 assert.deepEqual(res.body.details.request, "update");
                 assert.deepEqual(res.body.details.id, id);
                 assert.deepEqual(res.body.details.error, "invalid id format" );    
            });          
         });
         
         it("put Id missing test", async ()=>{
            const id = "6540099741fb5d62ecf7d8a4";
            await request.delete(`${url}/${id}`)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "error");
                 assert.deepEqual(res.body.details.request, "delete");
                 assert.deepEqual(res.body.details.id, id);
                 assert.deepEqual(res.body.details.error, "id not found" );    
            });          
         });

         it("delete Id invalid test", async ()=>{
            const id = "55";
            await request.delete(`${url}/${id}`)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "error");
                 assert.deepEqual(res.body.details.request, "delete");
                 assert.deepEqual(res.body.details.id, id);
                 assert.deepEqual(res.body.details.error, "invalid id format" );    
            });          
         });
         
         it("delete Id missing test", async ()=>{
            const id = "6540099741fb5d62ecf7d8a4";
            await request.put(`${url}/${id}`)
            .send(objectTest)
            .expect(200)
            .expect((res)=>{
                 assert.deepEqual(res.body.status, "error");
                 assert.deepEqual(res.body.details.request, "update");
                 assert.deepEqual(res.body.details.id, id);
                 assert.deepEqual(res.body.details.error, "id not found" );    
            });          
         });
    })    
}


module.exports = testCtrl;