const itemModel = require("../Models/itemsModel");


const updateItemController = async (req, res) => {
    try {
        const id = req.params.id

        const updatedItem = await itemModel.findByIdAndUpdate(id, req.body, { new: true })
        // console.log(updatedItem, "...updatedItem");

        if (!updatedItem) {
            return res.status(200).json({ success: false, message: "Items does not updated !!" })
        }

        return res.status(200).json({
            success: true,
            message: "Items updated successfully",
            item: updatedItem
        })

    } catch (error) {
        console.log("Error occure in updateItemController catch block..", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}

module.exports = updateItemController