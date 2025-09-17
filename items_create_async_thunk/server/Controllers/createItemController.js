const itemModel = require("../Models/itemsModel");

const createItemController = async (req, res) => {
    try {

        const { brand, model, price, description } = req.body

        const modelExists = await itemModel.findOne({ model })

        if (modelExists) {
            return res.status(500).json({ success: false, message: "Model already exists" })
        }

        const newItem = await itemModel.create({ brand, model, price, description })

        return res.status(201).json({
            success: true,
            message: "Item created successfully !",
            item: newItem
        })

    } catch (error) {
        console.log("Error occure in createItemController catch block..", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}

module.exports = createItemController
