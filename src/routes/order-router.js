const orderController = require("../controllers/order-controller")
const authMiddleware = require("../middlewares/auth-middleware")

const Router = require("express").Router

const router = Router()

router.post("/orders"/*, protectedMiddleware*/, orderController.createOrder)
// router.put("/orders/:id"/*, protectedMiddleware*/, orderController.updateOrder)
// router.delete("/orders/:id"/*, protectedMiddleware*/, orderController.deleteOrderById)
router.get("/orders",authMiddleware, orderController.getOrders)
router.get("/orders/:id", orderController.getOrderById)

module.exports = router