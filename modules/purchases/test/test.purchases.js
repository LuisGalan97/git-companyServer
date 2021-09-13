const testCtrl = require("../../../test/controllerTest");

const moduleName = "purchases";

const url = "/purchases";

const objectPost = {
    "name": "testName",
    "unitPrice": 1,
    "amount": 1,
    "section": "testSection",
    "usefulLife": 1
}

const objectPut = {
    "name": "testNameChanged",
    "unitPrice": 2,
    "amount": 2,
    "section": "testSectionChanged",
    "usefulLife": 2
}

testCtrl.testCrud(moduleName, url, objectPost, objectPut);
testCtrl.testErrors(moduleName, url, objectPost);