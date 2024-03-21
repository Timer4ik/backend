const { PropertyValue } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")

class PropertyValueController {
    async getPropertyValueById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            const include = getFullInclude(extend)

            const propertyType = await PropertyValue.findOne({
                where: {
                    property_type_id: id
                },
                include
            })

            return res.json({
                message: "Тип характеристики был успешно получен", data: propertyType
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getPropertyValues(req, res) {

        const { extend, like, page, limit, ...query } = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (like?.length) {
                where.name = {
                    [Op.iLike]: `%${like}%`
                }
            }

            const propertyValues = await PropertyValue.findAll({
                where,
                include,
                limit,
                offset: (limit * page) || 0,
                order: [['property_value_id', 'DESC']],
            })

            const count = await PropertyValue.count()
            return res.json({
                message: "Значения характеристики были успешно получены", data: propertyValues, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createPropertyValue(req, res) {

        const data = req.body

        try {

            console.log(data);

            const newPropertyType = await PropertyValue.create({
                ...data
            })

            return res.json({ message: "Новый тип характеристики был успешно добавлен", data: newPropertyType })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updatePropertyValue(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const propertyType = await PropertyValue.update({
                ...data
            }, {
                where: {
                    property_type_id: id
                },
                returning: true
            })
            return res.json({ message: "Тип характеристики был успешно обновлен", data: propertyType[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async deletePropertyValue(req, res) {

        const { id } = req.params

        try {

            const deletedPropertyType = await PropertyValue.destroy({
                where: {
                    property_value_id: id
                },
            })
            return res.json({ message: "Тип характеристики был успешно удален", data: deletedPropertyType })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
}

module.exports = new PropertyValueController()