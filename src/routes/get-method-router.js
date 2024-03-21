const getMethod = require("../controllers/get-method-controller")
const Router = require("express").Router

const router = Router()

router.get("/get-methods", getMethod.getGetMethods)

module.exports = router