const SubCategoryController = require("../controllers/subcategory-controller")

const Router = require("express").Router

const router = Router()

router.get("/sub-categories", SubCategoryController.getSubCategories)

module.exports = router