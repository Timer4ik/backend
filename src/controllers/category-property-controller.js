const { Op } = require("sequelize")
const { CategoryProperty, File } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const loadFile = require("../utils/loadFile")

class CategoryPropertyController {

    async getCategoryProperties(req, res) {

        const { extend, page, limit } = req.query

        const query = req.query

        try {
            const include = extend ? getFullInclude(extend) : null
            const where = query?.filter ?? {}

            const categoryProperties = await CategoryProperty.findAll({
                where,
                limit: limit || 100,
                offset: (limit * page) || 0,
                order: [['category_property_id', 'DESC']],
                include,
            })

            const count = await CategoryProperty.count()

            return res.json({
                message: "Характеристики категорий были успешно получены", data: categoryProperties, page, count
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createCategoryProperty(req, res) {

        const { ...data } = req.body

        try {

            const newCategory = await CategoryProperty.create({
                ...data,
            })

            return res.json({ message: "Новая характеристика для категории была успешно добавлена", data: newCategory })

        } catch (error) {

            return res.status(400).json({ message: "Что то пошло не так", error })
        }
    }

    async deleteCategoryPropertyById(req, res) {

        const { id } = req.params

        try {

            await CategoryProperty.destroy({
                where: {
                    category_property_id: id
                }
            })

            return res.json({ message: "Характеристика категории была успешно удалена" })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = new CategoryPropertyController()