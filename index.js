require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db.js")
const bcrypt = require("bcrypt")
const path = require("path")
const fileUpload = require("express-fileupload")
const uuid = require("uuid")

const { Category, Product, ProductPhoto, User, Developer, GetMethod, PaymentMethod } = require("./src/models/models.js")

const router = require("./src/routes/index")
const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "src/static")))

app.use("/api", router)

const start = async () => {

    await db.authenticate()
    await db.sync()

   
    const user = await User.findOne({
        where: {
            email: "admin123@yandex.ru",
        }
    })

    if (!user) {
        const hashedPassword = await bcrypt.hash("admin123@yandex.ru", 4)
        await User.create({
            email: "admin123@yandex.ru",
            name: "admin123@yandex.ru",
            password: hashedPassword,
            role: "admin",
        })
    }


    await app.listen(PORT, () => {
        console.log(`Server has been started on port http://localhost:${PORT}`);
    })
}

start()