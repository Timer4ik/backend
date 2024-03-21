const { Developer } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class DeveloperController {

    async getDeveloperById(req, res) {

        const { id } = req.params
        const { extend } = req.query


        try {
            const include = getFullInclude(extend)

            const developers = await Developer.findOne({
                where: {
                    developer_id: id
                },
                include
            })

            return res.json({
                message: "Производитель был успешно получен", data: developers
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getDevelopers(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { developer_id, extend } = req.query

        const query = req.query


        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (developer_id) {
                where.developer_id = developer_id
            }

            const developers = await Developer.findAll({
                where,
                include,
                limit,
                offset,
                order: [['developer_id', 'DESC']],
            })
            const count = await Developer.count()

            return res.json({
                message: "Производители успешно получены", data: developers, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createDeveloper(req, res) {

        const data = req.body

        try {

            const newDeveloper = await Developer.create({
                ...data
            })

            return res.json({ message: "Новый производитель был успешно добавлен", data: newDeveloper })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updateDeveloper(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedDeveloper = await Developer.update({
                ...data
            }, {
                where: {
                    developer_id: id
                },
                returning: true
            })
            return res.json({ message: "Производитель был успешно обновлен", data: updatedDeveloper[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async deleteDeveloperById(req, res) {

        const { id } = req.params

        try {

            await Developer.destroy({
                where: {
                    developer_id: id
                }
            })

            return res.json({ message: "Производитель был успешно удалён" })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = new DeveloperController()