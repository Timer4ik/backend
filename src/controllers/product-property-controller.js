const { ProductPropertyValue } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")

class ProductPropertyValueController {
    async getPropertyById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            const include = getFullInclude(extend)

            const product_property = await ProductPropertyValue.findOne({
                where: {
                    product_property_value_id: id
                },
                include
            })

            return res.json({
                message: "Значение характеристики у продукта было успешно получено", data: product_property
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getProductProperties(req, res) {

        const { extend, ...query } = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}
            

            const product_properties = await ProductPropertyValue.findAll({
                where,
                include,
                order: [['product_property_value_id', 'DESC']],
            })

            return res.json({
                message: "Характеристики продукта были успешно получены", data: product_properties
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createProductPropertyValue(req, res) {

        const data = req.body
        const {
            product_id,
            category_property_id,
            property_value_id
        } = req.body

        try {
            const propertyAlreadyExist = await ProductPropertyValue.findOne({
                where: {
                    product_id,
                    category_property_id,
                }
            })

            if (propertyAlreadyExist) {
                await ProductPropertyValue.update({ property_value_id }, {
                    where: {
                        product_id,
                        category_property_id,
                    }
                })
                return res.json({ message: "Характеристика продукта была успешно добавлена", data: propertyAlreadyExist })
            }

            const newProperty = await ProductPropertyValue.create({
                ...data
            })

            return res.json({ message: "Характеристика продукта была успешно добавлена", data: newProperty })

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

            const product_property = await ProductPropertyValue.update({
                ...data
            }, {
                where: {
                    product_property_value_id: id
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

            const deletedProperty = await ProductPropertyValue.destroy({
                where: {
                    product_property_value_id: id
                },
            })

            return res.json({ message: "Характеристика продукта была успешно удалена", data: deletedProperty })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
}

module.exports = new ProductPropertyValueController()