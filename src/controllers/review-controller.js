const { ProductReview } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class ReviewController {

    async getReviewById(req, res) {

        const { id } = req.params
        const { extend } = req.query


        try {
            const include = getFullInclude(extend)

            const orders = await ProductReview.findOne({
                where: {
                    order_id: id
                },
                include
            })

            return res.json({
                message: "Отзыв был успешно получен", data: orders
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getReviews(req, res) {

        const { page = 0, limit = 20 } = req.query

        const offset = getOffset(page, limit)

        const { extend } = req.query

        const query = req.query


        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}


            const orders = await ProductReview.findAll({
                where,
                include,
                limit,
                offset,
                order: [['product_review_id', 'DESC']],
            })
            const count = await ProductReview.count()

            return res.json({
                message: "Отзывы были успешно получены", data: orders, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createReview(req, res) {

        const { user_id } = req.user
        const data = req.body

        try {

            const exist = await ProductReview.findOne({
                where: {
                    user_id,
                    product_id: data.product_id
                }
            })

            if (exist) {
                return res.json({ message: "Отзыв уже существует", data: newReview })
            }

            const newReview = await ProductReview.create({
                ...data
            })

            return res.json({ message: "Отзыв добавлен", data: newReview })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так", error })
        }
    }
}

module.exports = new ReviewController()