const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientcontroller');



router.put('/updateQt/:id', clientController.updateQt);
router.post("/addClient", clientController.addClient);
router.get('/order/:id', clientController.getOrder);

module.exports = router;
