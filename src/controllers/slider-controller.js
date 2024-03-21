const { Slider, Enums } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude");
const getOffset = require("../utils/getOffset");
const loadFile = require("../utils/loadFile")

class SliderController {
    async getSliders(req, res) {

        const { slider_id, product_id, extend, page = 0, limit = 20, ...query } = req.query
        const offset = getOffset(page, limit)

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            const sliders = await Slider.findAll({
                where,
                include,
                limit,
                offset,
                order: [['slider_id', 'DESC']],
            })

            return res.json({
                message: "Слайдеры успешно получены", data: sliders
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
    async getSliderById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            const include = getFullInclude(extend)

            const categories = await Slider.findOne({
                where: {
                    slider_id: id
                },
                include
            })

            return res.json({
                message: "Слайдер был успешно получен", data: categories
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async createSlider(req, res) {

        const file = loadFile(req)

        const { photo, product_id, ...data } = req.body

        try {
            const newSlider = await Slider.create({
                ...data,
                product_id:+product_id || null,
                photo_url: photo
            })

            file?.load()
            return res.json({ message: "Новый слайдер был успешно добавлен", data: newSlider })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async deleteSlider(req, res) {

        const { id } = req.params

        try {

            await Slider.destroy({
                where: {
                    slider_id: id
                }
            })

            return res.json({ message: "Слайдер был успешно удалён" })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updateSlider(req, res) {

        const file = loadFile(req)

        const {
            title,
            text,
            product_id,
            is_active,
            ...data
        } = req.body

        const { id } = req.params

        try {

            const updatedSlider = await Slider.update({
                title,
                text,
                product_id:+product_id || null,
                is_active,
                photo_url: data.photo,
                ...data
            }, {
                where: {
                    slider_id: id
                },
                returning: true
            })

            file?.load()
            return res.json({ message: "Слайдер был успешно обновлён", data: updatedSlider[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

}

module.exports = new SliderController()