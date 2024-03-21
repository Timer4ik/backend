const getFullInclude = require("../utils/getFullInclude");

class BaseController {

    static Model = null

    static async getById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            console.log(this.Model);
            const include = getFullInclude(extend)
            const item = await this.Model.findByPk(id, {
                include
            })

            return res.json({
                message: "Элемент был успешно получен", data: item
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    static async get(req, res) {

        const { extend } = req.query

        try {
            const include = getFullInclude(extend)
            const where = data?.filter ?? {}
            const items = await this.Model.findAll({
                where,
                include
            })

            return res.json({
                message: "Данные успешно получены", data: items
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async post(req, res) {

        const data = req.body

        try {

            const newCategory = await Model.create({
                ...data
            })

            return res.json({ message: "Новая категория была успешно добавлена", data: newCategory })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async put(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedCategory = await Model.update({
                ...data
            }, {
                where: {
                    category: id
                },
                returning: true
            })
            return res.json({ message: "Категория была успешно обновлена", data: updatedCategory[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = BaseController