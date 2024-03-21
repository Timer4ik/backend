const { Shop } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class ShopController {

    async getShopById(req, res) {

        const { id } = req.params
        const { extend } = req.query


        try {
            const include = getFullInclude(extend)

            const shop = await Shop.findOne({
                where: {
                    shop_id: id
                },
                include
            })

            return res.json({
                message: "Магазин был успешно получен", data: shop
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getShops(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { shop_id, extend } = req.query

        const query = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (shop_id) {
                where.shop_id = shop_id
            }

            const shops = await Shop.findAll({
                where,
                include,
                limit,
                offset,
                order: [['shop_id', 'DESC']],
            })
            const count = await Shop.count()

            return res.json({
                message: "Магазины успешно получены", data: shops, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createShop(req, res) {

        const data = req.body

        try {

            const newShop = await Shop.create({
                ...data
            })

            return res.json({ message: "Новый магазин был успешно добавлен", data: newShop })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updateShopById(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedShop = await Shop.update({
                ...data
            }, {
                where: {
                    shop_id: id
                },
                returning: true
            })
            return res.json({ message: "Магазин был успешно обновлен", data: updatedShop[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async deleteShopById(req, res) {

        const { id } = req.params

        try {

            await Shop.destroy({
                where: {
                    shop_id: id
                }
            })

            return res.json({ message: "Магазин был успешно удалён" })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = new ShopController()