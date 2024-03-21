const paymentMethod = require("../controllers/payment-method-controller")
const Router = require("express").Router

const router = Router()

router.get("/payment-methods", paymentMethod.getPaymentMethods)

module.exports = router