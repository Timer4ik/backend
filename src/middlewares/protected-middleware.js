const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "Доступ запрещён" })
        }

        const decoded = jwt.decode(token,process.env.SECRET_TOKEN)

        if (decoded.role !== "admin"){
            return res.status(401).json({ message: "Доступ запрещён" })
        }
        
        return next()

    } catch (error) {
        return res.status(401).json({ message: "Доступ запрещён" })
    }
}