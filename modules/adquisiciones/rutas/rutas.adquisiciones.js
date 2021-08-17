const express = require('express');
const router = express.Router()


const adquisicion = require('../controlador/controlador.adquisiciones');


router.post('/', adquisicion.createAdquisicion);
router.get('/', adquisicion.readAdquisicion);
router.get('/:id', adquisicion.readAdquisicion);
router.put('/:id', adquisicion.updateAdquisicion);
router.delete('/:id', adquisicion.deleteAdquisicion);

module.exports = router; 