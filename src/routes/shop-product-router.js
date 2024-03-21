const ShopProductController = require("../controllers/shop-product-controller.js")

const Router = require("express").Router

const router = Router()

router.get("/shop-products/:id", ShopProductController.getShopProductById)
router.get("/shop-products", ShopProductController.getShopProducts)
router.post("/shop-products", ShopProductController.createShopProduct)
router.put("/shop-products/:id", ShopProductController.updateShopProductById)
router.delete("/shop-products/:id", ShopProductController.deleteShopProductById)

module.exports = router