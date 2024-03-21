const { OrderProduct } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class OrderProductController {

    async getOrderProductById(req, res) {

        const { id } = req.params
        const { extend } = req.query


        try {
            const include = getFullInclude(extend)

            const orderProducts = await OrderProduct.findOne({
                where: {
                    order_product_id: id
                },
                include
            })

            return res.json({
                message: "Товар заказа был успешно получен", data: orderProducts
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getOrderProducts(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { order_product_id, extend } = req.query

        const query = req.query


        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (order_product_id) {
                where.order_product_id = order_product_id
            }

            const orderProducts = await OrderProduct.findAll({
                where,
                include,
                limit,
                offset,
                orderProduct: [['order_product_id', 'DESC']],
            })
            const count = await OrderProduct.count()

            return res.json({
                message: "Товары заказа получены", data: orderProducts, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createOrderProduct(req, res) {

        const data = req.body

        try {

            const newOrderProduct = await OrderProduct.create({
                ...data
            })

            return res.json({ message: "Товар заказа успешно добавлен", data: newOrderProduct })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" ,error})
        }
    }
}

module.exports = new OrderProductController()