const PropertyValueController = require("../controllers/property-values-controller")

const Router = require("express").Router

const router = Router()

router.get("/property-values", PropertyValueController.getPropertyValues)
router.get("/property-values/:id", PropertyValueController.getPropertyValueById)
router.post("/property-values", PropertyValueController.createPropertyValue)
router.put("/property-values/:id", PropertyValueController.updatePropertyValue)
router.delete("/property-values/:id", PropertyValueController.deletePropertyValue)

module.exports = router