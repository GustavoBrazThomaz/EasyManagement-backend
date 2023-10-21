const router = require('express').Router()

const customerController = require('../controller/CustomerControler')

router.get('/customer', customerController.getAllCustomer)
router.post('/customer', customerController.createCustomer)
router.put('/customer/:id', customerController.putCustomer)
router.delete('/customer/:id', customerController.deleteCustomer)

module.exports = router