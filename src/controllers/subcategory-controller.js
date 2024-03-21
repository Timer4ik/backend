// const { Category, SubCategory, Enums } = require("../models/models")
// const getFullInclude = require("../utils/getFullInclude")

// class SubCategoryController {
//     async getSubCategories(req, res) {

//         const { sub_category_id, category_id, extend } = req.query

//         try {
//             const include = getFullInclude(extend)
//             const where = data?.filter ?? {}

//             if (sub_category_id) {
//                 where.sub_category_id = sub_category_id
//             }
//             if (category_id) {
//                 where.category_id = category_id
//             }

//             const subCategories = await SubCategory.findAll({
//                 where,
//                 include
//             })

//             return res.json({
//                 message: "Подкатегории успешно получены успешно получены", data: subCategories
//             })

//         } catch (error) {
//             return res.status(400).json({ message: "Что то пошло не так" })
//         }
//     }

// }

// module.exports = new SubCategoryController()