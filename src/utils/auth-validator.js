const { check } = require("express-validator")

module.exports = {
    registerValidator: [
        check("name", "Минимальный размер имени 6 символов").exists().isLength({ min: 6 }),
        check("email", "Введите корректный email").exists().isEmail(),
        check("password", "Минимальный размер пароля 6 символов").exists().isLength({ min: 6 })
    ],
    loginValidator: [
        check("email", "Введите email").exists(),
        check("password", "Введите пароль").exists()
    ]
}