const { ShopProduct } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class ShopProductController {

    async getShopProductById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            const include = getFullInclude(extend)

            const shop = await ShopProduct.findOne({
                where: {
                    shop_product_id: id
                },
                include
            })

            return res.json({
                message: "Продукт магазина был успешно получен", data: shop
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getShopProducts(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { shop_product_id, extend } = req.query

        const query = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (shop_product_id) {
                where.shop_product_id = shop_product_id
            }

            const shops = await ShopProduct.findAll({
                where,
                include,
                limit,
                offset,
                order: [['shop_product_id', 'DESC']],
            })
            const count = await ShopProduct.count()

            return res.json({
                message: "Продукты магазинов были успешно получены", data: shops, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createShopProduct(req, res) {

        const data = req.body

        try {

            const newShop = await ShopProduct.create({
                ...data
            })

            return res.json({ message: "Новый продукт магазина был успешно добавлен", data: newShop })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updateShopProductById(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedShop = await ShopProduct.update({
                ...data
            }, {
                where: {
                    shop_product_id: id
                },
                returning: true
            })
            return res.json({ message: "Продукт магазина был успешно обновлен", data: updatedShop[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async deleteShopProductById(req, res) {

        const { id } = req.params

        try {

            await ShopProduct.destroy({
                where: {
                    shop_product_id: id
                }
            })

            return res.json({ message: "Продукт магазин был успешно удалён" })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = new ShopProductController()