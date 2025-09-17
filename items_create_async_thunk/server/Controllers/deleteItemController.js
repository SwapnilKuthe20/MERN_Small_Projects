const { default: mongoose } = require("mongoose");
const itemModel = require("../Models/itemsModel");

const deleteItemController = async (req, res) => {
    try {

        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "items type not valid it must be objectId" })
        }

        const deleteItem = await itemModel.findByIdAndDelete(id)
        console.log(deleteItem, "....deleteItem");

        if (!deleteItem) {
            return res.status(400).json({ success: false, message: "Item does not deleted .. something went wrong" })
        }

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully !!",
            item: deleteItem
        })

    } catch (error) {
        console.log("Error occure in updateItemController catch block..", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = deleteItemController