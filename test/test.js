require("../modules/employees/test/test.employees");
require("../modules/purchases/test/test.purchases");

const assert = require("chai").assert;
const dbConnect = require("../database/dbConnect");

describe("test connection error", ()=>{
    it("conection error", async () => {
        const url = 'fail';
        const answer = await dbConnect.connect(url);
        assert.deepEqual(answer, "connection fail");
    });   
});