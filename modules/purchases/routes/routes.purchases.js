const express = require('express');
const router = express.Router()

const purchaseCtrl = require('../controller/controller.purchases');

router.post('/', purchaseCtrl.create);
router.get('/', purchaseCtrl.read);
router.get('/:id', purchaseCtrl.read);
router.put('/:id', purchaseCtrl.update);
router.delete('/:id', purchaseCtrl.delete);

module.exports = router; 