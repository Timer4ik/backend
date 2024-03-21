const FileController = require("../controllers/file-controller.js")

const Router = require("express").Router

const router = Router()

// router.get("/file/:id", FileController.getProductPhotosByProjectId)
// router.get("/file", FileController.getProductPhotos)
router.post("/files", FileController.loadPhoto)

module.exports = router