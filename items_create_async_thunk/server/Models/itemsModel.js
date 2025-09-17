const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const itemModel = mongoose.model("Item", itemSchema)

module.exports = itemModel


