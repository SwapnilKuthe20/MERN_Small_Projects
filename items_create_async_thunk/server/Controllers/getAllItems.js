const itemModel = require("../Models/itemsModel");

const getAllItemsController = async (req, res) => {
    try {

        const items = await itemModel.find()
        // console.log(items, "...items find");

        if (!items) {
            return res.status(400).json({ success: false, message: "Itema not found !!" })
        }

        return res.status(200).json({
            success: true,
            message: "Fetch all items succesfully !!",
            items: items
        })

    } catch (error) {
        console.log("Error occure in getAllItemsController catch block..", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}

module.exports = getAllItemsController