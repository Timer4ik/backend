const ShopController = require("../controllers/shop-controller.js")

const Router = require("express").Router

const router = Router()

router.get("/shops/:id", ShopController.getShopById)
router.get("/shops", ShopController.getShops)
router.post("/shops", ShopController.createShop)
router.put("/shops/:id", ShopController.updateShopById)
router.delete("/shops/:id", ShopController.deleteShopById)

module.exports = router