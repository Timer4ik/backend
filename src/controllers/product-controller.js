const { Op } = require("sequelize")
const { Product, Category, Enums, Property, ProductPropertyValue, CategoryProperty, File, PropertyValue } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")
const loadFile = require("../utils/loadFile")

class ProductController {

    async getProducts(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { product_id, category_id, extend, like, property_value_id, ...query } = req.query

        let include = getFullInclude(extend)

        if (property_value_id) {
            include.push({
                model: ProductPropertyValue,
                where: {
                    property_value_id
                }
            })
        }

        const where = query?.filter ?? {}

        // if (product_id) {
        //     where.product_id = product_id
        // }
        // if (sub_category_id) {
        //     where.sub_category_id = sub_category_id
        // }
        // if (category_id) {
        //     include.push({
        //         model: Category,
        //         where: {
        //             category_id
        //         }
        //     })
        // }
        if (like?.length) {
            where.name = {
                [Op.iLike]: `%${like}%`
            }
        }

        try {
            const products = await Product.findAll({
                where,
                include: include,
                limit,
                offset,
                order: [['product_id', 'DESC']],
            })

            const count = await Product.count({
                where
            })

            return res.json({ count, message: "Продукты успешно получены", data: products })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так", error })
        }
    }
    async getProductById(req, res) {

        const { product_id, category_id, extend, ...query } = req.query
        const { id } = req.params

        const include = getFullInclude(extend)
        const where = query?.filter ?? {}

        where.product_id = id

        if (product_id) {
            where.product_id = product_id
        }
        // if (sub_category_id) {
        //     where.sub_category_id = sub_category_id
        // }
        if (category_id) {
            include.push({
                model: Category,
                where: {
                    category_id
                }
            })
        }

        try {
            const product = await Product.findOne({
                where,
                include,
            })

            return res.json({ message: "Продукт получен", data: product })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async createProduct(req, res) {

        const file = loadFile(req)

        const data = req.body

        try {
            const newProduct = await Product.create({
                ...data,
                image_url: data?.photo
            })

            file?.load()


            return res.json({ message: "Новый продукт был успешно добавлен", data: newProduct })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так", error })
        }
    }

    async deleteProduct(req, res) {

        const { id } = req.params

        try {

            await Product.destroy({
                where: {
                    product_id: id
                }
            })
            return res.json({ message: "Товар был успешно удалён", data: udpatedFilm[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
    async updateProduct(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const udpatedFilm = await Product.update(data, {
                where: {
                    product_id: id
                },
                returning: true
            })
            return res.json({ message: "Товар был успешно обновлён", data: udpatedFilm[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
}

module.exports = new ProductController()