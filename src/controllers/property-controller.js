const { Op } = require("sequelize")
const { Property } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class PropertyController {
    async getPropertyById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            const include = getFullInclude(extend)

            const property = await Property.findOne({
                where: {
                    property_id: id
                },
                include
            })

            return res.json({
                message: "Характеристика была успешно получена", data: property
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getProperty(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { extend, like, ...query } = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (like?.length) {
                where.name = {
                    [Op.iLike]: `%${like}%`
                }
            }

            const property = await Property.findAll({
                where,
                include,
                limit,
                offset,
                order: [['property_id', 'DESC']],

            })
            const count = await Property.count()

            return res.json({
                message: "Характеристики были успешно получены", data: property,count
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createProperty(req, res) {

        const data = req.body

        try {

            const newProperty = await Property.create({
                ...data
            })

            return res.json({ message: "Характеристика была успешно добавлена", data: newProperty })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updateProperty(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const property = await Property.update({
                ...data
            }, {
                where: {
                    property_id: id
                },
                returning: true
            })
            return res.json({ message: "Характеристика была успешно обновлена", data: property[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async deleteProperty(req, res) {

        const { id } = req.params

        try {

            const deletedProperty = await Property.destroy({
                where: {
                    property_id: id
                },
            })

            return res.json({ message: "Характеристика была успешно удалена", data: deletedProperty })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
}

module.exports = new PropertyController()