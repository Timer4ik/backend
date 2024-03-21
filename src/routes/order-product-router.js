const orderProductController = require("../controllers/order-product-controller")
const authMiddleware = require("../middlewares/auth-middleware")

const Router = require("express").Router

const router = Router()

router.post("/order-products"/*, protectedMiddleware*/, orderProductController.createOrderProduct)
// router.put("/order-products/:id"/*, protectedMiddleware*/, orderProductController.updateOrder)
// router.delete("/order-products/:id"/*, protectedMiddleware*/, orderProductController.deleteOrderById)
router.get("/order-products",authMiddleware, orderProductController.getOrderProducts)
router.get("/order-products/:id", orderProductController.getOrderProductById)

module.exports = router