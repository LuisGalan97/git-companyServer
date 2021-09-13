const testCtrl = require("../../../test/controllerTest");

const moduleName = "employees";

const url = "/employees";

const objectPost = {
    "name": "testName",
    "position": "testPosition",
    "office": "testOffice",
    "salary": 1
}

const objectPut = {
    "name": "testNameChanged",
    "position": "testPositionChanged",
    "office": "testOfficeChanged",
    "salary": 2
}

testCtrl.testCrud(moduleName, url, objectPost, objectPut);
testCtrl.testErrors(moduleName, url, objectPost);