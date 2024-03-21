const { Promo } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")

class PromoController {
    async getPromoById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            const include = getFullInclude(extend)

            const promos = await Promo.findOne({
                where: {
                    promo_id: id
                },
                include
            })

            return res.json({
                message: "Промо была успешно получена", data: promos
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getPromos(req, res) {

        const { extend, ...query } = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            const promos = await Promo.findAll({
                where,
                include,
                order: [['promo_id', 'DESC']],
            })

            return res.json({
                message: "Промо акции были успешно получены", data: promos
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createPromo(req, res) {

        const data = req.body

        try {

            const newPromo = await Promo.create({
                ...data
            })

            return res.json({ message: "Новая промо акция была успешно добавлена", data: newPromo })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updatePromo(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedPromo = await Promo.update({
                ...data
            }, {
                where: {
                    promo_id: id
                },
                returning: true
            })
            return res.json({ message: "Проио акция была успешно обновлена", data: updatedPromo[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async deletePromo(req, res) {

        const { id } = req.params

        try {

            const deletedPromo = await Promo.destroy({
                where: {
                    promo_id: id
                },
            })
            return res.json({ message: "Промо акция была успешно удалена", data: deletedPromo })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
}

module.exports = new PromoController()