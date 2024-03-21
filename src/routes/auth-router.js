const Router = require("express").Router
const AuthController = require("../controllers/auth-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const validatorMiddleware = require("../middlewares/validator-middleware")
const { loginValidator, registerValidator } = require("../utils/auth-validator")

const router = Router()

router.post("/register", validatorMiddleware(registerValidator), AuthController.register)
router.post("/login", validatorMiddleware(loginValidator), AuthController.login)
router.get("/me", authMiddleware, AuthController.getProfile)

module.exports = router