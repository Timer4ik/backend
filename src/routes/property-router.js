const PropertyController = require("../controllers/property-controller")

const Router = require("express").Router

const router = Router()

router.get("/properties", PropertyController.getProperty)
router.get("/properties/:id", PropertyController.getPropertyById)
router.post("/properties", PropertyController.createProperty)
router.put("/properties/:id", PropertyController.updateProperty)
router.delete("/properties/:id", PropertyController.deleteProperty)

module.exports = router