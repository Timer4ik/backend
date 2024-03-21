const developerController = require("../controllers/developer-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const protectedMiddleware = require("../middlewares/protected-middleware")

const Router = require("express").Router

const router = Router()

router.post("/developers"/*, protectedMiddleware*/, developerController.createDeveloper)
router.put("/developers/:id"/*, protectedMiddleware*/, developerController.updateDeveloper)
router.delete("/developers/:id"/*, protectedMiddleware*/, developerController.deleteDeveloperById)
// router.put("/film/:id", protectedMiddleware, filmController.updateFilm)
router.get("/developers", developerController.getDevelopers)
router.get("/developers/:id", developerController.getDeveloperById)

module.exports = router