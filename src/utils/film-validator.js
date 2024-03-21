const { check } = require("express-validator")

// module.exports = {
//     filmCreateValidator: [
//         check("name", "Название не может быть пустым").exists(),
//         check("email", "Введите корректный email").exists().isEmail(),
//         check("password", "Минимальный размер пароля 6 символов").exists().isLength({ min: 6 })
//     ]
// }