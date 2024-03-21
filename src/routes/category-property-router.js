const CategoryPropertyController = require("../controllers/category-property-controller")

const Router = require("express").Router

const router = Router()

router.get("/category-properties", CategoryPropertyController.getCategoryProperties)
// router.get("/category-properties/:id", CategoryPropertyController.getCategoryById)
router.post("/category-properties", CategoryPropertyController.createCategoryProperty)
// router.put("/category-properties/:id", CategoryPropertyController.updateCategory)
router.delete("/category-properties/:id", CategoryPropertyController.deleteCategoryPropertyById)

module.exports = router