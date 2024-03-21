const PromoController = require("../controllers/promo-controller")

const Router = require("express").Router

const router = Router()

router.get("/promo", PromoController.getPromos)
router.get("/promo/:id", PromoController.getPromoById)
router.post("/promo", PromoController.createPromo)
router.put("/promo/:id", PromoController.updatePromo)
router.delete("/promo/:id", PromoController.deletePromo)

module.exports = router