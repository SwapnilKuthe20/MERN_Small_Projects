const Joi = require('joi')

const itemsMiddleware = (req, res, next) => {
    try {

        // const { brand, model, price, description } = req.body

        const schema = Joi.object({
            brand: Joi.string().min(3).max(15).required(),
            model: Joi.string().min(1).max(15).required(),
            price: Joi.number().positive().required(),
            description: Joi.string().min(5).required()
        })

        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            const messages = error.details.map(detail => detail.message);
            console.log(messages, "...error middleware");
            return res.status(400).json({ success: false, message: messages })
        }

        next()

    } catch (error) {
        console.log("Error occure in itemsMiddleware catch block..", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}

module.exports = itemsMiddleware