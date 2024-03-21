const loadFile = require("../utils/loadFile")
const { ProductPhoto, Enums } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")


class ProductPhotoController {
    async getProductPhotos(req, res) {

        const { extend, ...query } = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            const photos = await ProductPhoto.findAll({
                where,
                include,
                order: [['product_photo_id', 'DESC']],
            })

            return res.json({
                message: "Фотографии успешно получены", data: photos
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
    async getProductPhotosByProjectId(req, res) {

        const { id } = req.params
        const { extend, ...query } = req.query

        try {
            const include = getFullInclude(extend)
            const where = query?.filter ?? {}

            where.product_id = id

            const photos = await ProductPhoto.findAll({
                where,
                include
            })

            return res.json({
                message: "Фотографии успешно получены", data: photos
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async updatePhoto(req, res) {
        const { id } = req.params
        const data = req.body

        try {

            let productPhotos = await ProductPhoto.update({
                name: data.name
            }, {
                where: {
                    product_photo_id: id
                }
            })


            return res.json({
                message: "Фотографии были успешно добавлены",
                data: productPhotos
            })


        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async loadPhoto(req, res) {

        // const file = loadFile(req, { multiple: true })

        const data = req.body

        try {
            const photos = await ProductPhoto.findAll({
                where: {
                    product_id: data.product_id
                },
            })

            if (photos.length >= 5) {
                return res.status(400).json({ message: "Максимальное количество фотографий" })
            }

            let productPhotos = await ProductPhoto.create(data)


            return res.json({
                message: "Фотографии были успешно добавлены",
                data: productPhotos
            })


        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async deleteProductPhotoById(req, res) {

        const { id } = req.params

        try {

            await ProductPhoto.destroy({
                where: {
                    product_photo_id: id
                }
            })

            return res.json({
                message: "Фото было успешно удалено",
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = new ProductPhotoController()