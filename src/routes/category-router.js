const CategoryController = require("../controllers/category-controller")
const authMiddleware = require("../middlewares/auth-middleware")

const Router = require("express").Router

const router = Router()

router.get("/categories", CategoryController.getCategories)
router.get("/categories/:id", CategoryController.getCategoryById)
router.post("/categories",authMiddleware, CategoryController.createCategory)
router.put("/categories/:id",authMiddleware, CategoryController.updateCategory)
router.delete("/categories/:id",authMiddleware, CategoryController.deleteCategoryById)

module.exports = router