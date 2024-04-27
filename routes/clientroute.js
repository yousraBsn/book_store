const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientcontroller');



router.put('/updateQt/:id', clientController.updateQt);
router.post("/addClient", clientController.addClient);
router.get('/getOrder', clientController.getOrder);
router.delete("/clients/delete",clientController.orderDelete);

module.exports = router;
