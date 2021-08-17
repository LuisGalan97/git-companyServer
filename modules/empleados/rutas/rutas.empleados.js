const express = require('express');
const router = express.Router()


const employee = require('../controlador/controlador.empleados');


router.post('/', employee.createEmpleado);
router.get('/', employee.readEmpleado);
router.get('/:id', employee.readEmpleado);
router.put('/:id', employee.updateEmpleado);
router.delete('/:id', employee.deleteEmpleado);
module.exports = router; 