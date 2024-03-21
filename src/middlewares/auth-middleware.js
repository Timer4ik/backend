const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" })
        }
        const decode = jwt.decode(token,process.env.SECRET_TOKEN)

        if (!decode) {
            return res.status(401).json({ message: "Пользователь не авторизован" })
        }
        req.user = jwt.decode(token,process.env.SECRET_TOKEN)

        return next()

    } catch (error) {
        return res.status(401).json({ message: "Пользователь не авторизован" })
    }
}