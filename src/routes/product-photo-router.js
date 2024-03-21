const ProductPhotoController = require("../controllers/product-photo-controller.js")

const Router = require("express").Router

const router = Router()

router.get("/product-photos/:id", ProductPhotoController.getProductPhotosByProjectId)
router.get("/product-photos", ProductPhotoController.getProductPhotos)
router.post("/product-photos", ProductPhotoController.loadPhoto)
router.put("/product-photos/:id", ProductPhotoController.updatePhoto)
router.delete("/product-photos/:id", ProductPhotoController.deleteProductPhotoById)

module.exports = router