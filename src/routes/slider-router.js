const SliderController = require("../controllers/slider-controller")

const Router = require("express").Router

const router = Router()

router.get("/sliders", SliderController.getSliders)
router.get("/sliders/:id", SliderController.getSliderById)
router.post("/sliders", SliderController.createSlider)
router.put("/sliders/:id", SliderController.updateSlider)
router.delete("/sliders/:id", SliderController.deleteSlider)

module.exports = router