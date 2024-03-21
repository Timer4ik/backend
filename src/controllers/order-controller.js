const { Order } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class OrderController {

    async getOrderById(req, res) {

        const { id } = req.params
        const { extend } = req.query


        try {
            const include = getFullInclude(extend)

            const orders = await Order.findOne({
                where: {
                    order_id: id
                },
                include
            })

            return res.json({
                message: "Заказ был успешно получен", data: orders
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getOrders(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { order_id, extend } = req.query

        const query = req.query


        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            if (order_id) {
                where.order_id = order_id
            }

            const orders = await Order.findAll({
                where,
                include,
                limit,
                offset,
                order: [['order_id', 'DESC']],
            })
            const count = await Order.count()

            return res.json({
                message: "Заказы успешно получены", data: orders, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createOrder(req, res) {

        const data = req.body

        try {

            const newOrder = await Order.create({
                ...data
            })

            return res.json({ message: "Заказ оформлен", data: newOrder })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" ,error})
        }
    }
}

module.exports = new OrderController()