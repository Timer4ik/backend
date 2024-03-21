const productController = require("../controllers/product-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const protectedMiddleware = require("../middlewares/protected-middleware")

const Router = require("express").Router

const router = Router()

router.post("/products"/*, protectedMiddleware*/, productController.createProduct)
// router.put("/film/:id", protectedMiddleware, filmController.updateFilm)
router.get("/products", productController.getProducts)
router.put("/products/:id", productController.updateProduct)
router.get("/products/:id", productController.getProductById)
router.delete("/products/:id", productController.deleteProduct)

module.exports = router