const ReviewController = require("../controllers/review-controller")
const authMiddleware = require("../middlewares/auth-middleware")

const Router = require("express").Router

const router = Router()

router.get("/reviews", ReviewController.getReviews)
// router.get("/review/:id", ReviewController.getPropertyById)
router.post("/reviews",authMiddleware, ReviewController.createReview)
// router.put("/review/:id", ReviewController.updateProperty)
// router.delete("/review/:id", ReviewController.deleteProperty)

module.exports = router