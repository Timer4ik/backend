const { GetMethod } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")

class GetMethodController {

    async getGetMethods(req, res) {

        try {
           

            const getMethod = await GetMethod.findAll()
            const count = await GetMethod.count()

            return res.json({
                message: "Способы получения успешно получены", data: getMethod, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

}

module.exports = new GetMethodController()