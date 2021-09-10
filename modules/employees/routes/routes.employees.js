const express = require('express');
const router = express.Router()

const employeeCtrl = require('../controller/controller.employees');

router.post('/', employeeCtrl.create);
router.get('/', employeeCtrl.read);
router.get('/:id', employeeCtrl.read);
router.put('/:id', employeeCtrl.update);
router.delete('/:id', employeeCtrl.delete);

module.exports = router; 