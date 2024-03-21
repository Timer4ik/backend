const { PaymentMethod } = require("../models/models")
const getFullInclude = require("../utils/getFullInclude")
const getOffset = require("../utils/getOffset")

class PaymentMethodController {

    async getPaymentMethods(req, res) {

        try {

            const paymentMethods = await PaymentMethod.findAll({
              
            })
            const count = await PaymentMethod.count()

            return res.json({
                message: "Способы оплаты успешно получены", data: paymentMethods, count
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

}

module.exports = new PaymentMethodController()