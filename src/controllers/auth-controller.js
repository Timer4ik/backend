const bcrypt = require("bcrypt")
const { User } = require("../models/models")
const jwt = require("jsonwebtoken")


class AuthController {

    async getProfile(req, res) {

        const { user_id } = req.user

        const user = await User.findOne({ where: { user_id } })

        return res.json({ message: "Профиль пользователя успешно получен", user })
    }

    async register(req, res) {

        const { name, email, password } = req.body

        try {

            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) {
                return res.status(400).json({ message: "Пользователь с таким email уже существует" })
            }

            const hashedPassword = await bcrypt.hash(password, 4)

            const newUser = await User.create({
                name, email, password: hashedPassword
            })

            await newUser.save()

            return res.json({
                message: "Пользователь был успешно создан", user: {
                    user_id: newUser.user_id,
                    name,
                    email
                }
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
    async login(req, res) {

        const { email, password } = req.body
        const data = req.body

        try {

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                return res.status(400).json({ message: "Неверный логин или пароль" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Неверный логин или пароль" })
            }

            const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: "24h" })

            return res.json({
                message: "Авторизация прошла успешно",
                token,
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email
                }
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }
}

module.exports = new AuthController()