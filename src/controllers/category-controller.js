const { Op, Sequelize } = require("sequelize")
const { Category, File } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const loadFile = require("../utils/loadFile")
const getOffset = require("../utils/getOffset")

const parentsInclude = {
    model: Category,
    as: 'categories',
    // include: [{
    //     model: Category,
    //     as: 'childs',
    //     include: [{
    //         model: Category,
    //         as: 'parent',
    //         include: [{
    //             model: Category,
    //             as: 'parent',
    //             include: [{
    //                 model: Category,
    //                 as: 'parent',
    //             }],
    //         }],
    //     }],
    // }],
}
const parentInclude = {
    model: Category,
    as: 'parent',
    include: [{
        model: Category,
        as: 'parent',
        include: [{
            model: Category,
            as: 'parent',
            include: [{
                model: Category,
                as: 'parent',
                include: [{
                    model: Category,
                    as: 'parent',
                    include: [{
                        model: Category,
                        as: 'parent',
                        include: [{
                            model: Category,
                            as: 'parent',

                        }],
                    }],
                }],
            }],
        }],
    }],
}
class CategoryController {

    async getCategoryById(req, res) {

        const { id } = req.params
        let { extend } = req.query

        let hasParent = false
        let hasParents = false
        if (extend) {
            let _extends = extend.split(",")
            if (_extends.find(item => item == "parent")) {
                hasParent = true
                extend = _extends?.filter(ex => ex !== "parent")?.join(",")
            }
            if (_extends.find(item => item == "categories")) {
                hasParents = true
                extend = _extends?.filter(ex => ex !== "categories")?.join(",")
            }
        }

        try {
            const include = getFullInclude(extend)
            if (hasParent) {
                include.push(parentInclude)
            }
            if (hasParents) {
                include.push(parentsInclude)
            }

            const { dataValues: category } = await Category.findOne({
                where: {
                    category_id: id
                },
                include: [...include],

            })
            // category.parent = await Category.findOne({
            //     where: {
            //         category_id: category.parent_id
            //     },
            // })
            return res.json({
                message: "Категория была успешно получена", data: category
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так", error })
        }
    }

    async getCategories(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        let { category_id, extend, extendParent, like } = req.query

        const query = req.query

        let hasParent = false
        let hasParents = false
        
        if (extend) {
            let _extends = extend.split(",")
            if (_extends.find(item => item == "parent")) {
                hasParent = true
                extend = _extends?.filter(ex => ex !== "parent")?.join(",")
            }
            if (_extends.find(item => item == "categories")) {
                hasParents = true
                extend = _extends?.filter(ex => ex !== "categories")?.join(",")
            }
        }

        try {
            const include = extend ? getFullInclude(extend) : null
            const where = query?.filter ?? {}

            if (hasParent) {
                include.push(parentInclude)
            }
            if (hasParents) {
                include.push(parentsInclude)
            }

            if (like?.length) {
                where.name = {
                    [Op.iLike]: `%${like}%`
                }
            }

            const categories = await Category.findAll({
                where,
                limit,
                offset,
                order: [['category_id', 'DESC']],
                include,
                // attributes: [[Sequelize.fn('max', Sequelize.col('price')), 'maxPrice']],
            })

            let cats = [...categories.map(item => item.dataValues)]

            if (extendParent) {
                for (let item of cats) {
                    item.parent = await Category.findOne({
                        where: {
                            category_id: item.parent_id
                        },
                    })
                }
            }
            const count = await Category.count()

            return res.json({
                message: "Категории успешно получены", data: cats, page, count
            })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createCategory(req, res) {


        const file = loadFile(req)

        const { ...data } = req.body


        try {

            const newCategory = await Category.create({
                ...data,
            })

            file?.load()

            return res.json({ message: "Новая категория была успешно добавлена", data: newCategory })

        } catch (error) {

            return res.status(400).json({ message: "Что то пошло не так", error })
        }
    }

    async updateCategory(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedCategory = await Category.update({
                ...data,
            }, {
                where: {
                    category_id: id
                },
                returning: true
            })

            return res.json({ message: "Категория была успешно обновлена", data: updatedCategory[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async deleteCategoryById(req, res) {

        const { id } = req.params

        try {

            await Category.destroy({
                where: {
                    category_id: id
                }
            })

            return res.json({ message: "Категория была успешно удалена" })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = new CategoryController()