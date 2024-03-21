const { validationResult } = require("express-validator")

module.exports = (validator) => {
    return [...validator, (req, res, next) => {

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        }

        return res.status(400).json({
            message: "Введены некорректные данные",
            errors: errors.array()
        })

    }]
}