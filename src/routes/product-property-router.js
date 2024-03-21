const ProductPropertyValueController = require("../controllers/product-property-controller")

const Router = require("express").Router

const router = Router()

router.get("/product-properties", ProductPropertyValueController.getProductProperties)
router.get("/product-properties/:id", ProductPropertyValueController.getPropertyById)
router.post("/product-properties", ProductPropertyValueController.createProductPropertyValue)
router.put("/product-properties/:id", ProductPropertyValueController.updateProperty)
router.delete("/product-properties/:id", ProductPropertyValueController.deleteProperty)

module.exports = router