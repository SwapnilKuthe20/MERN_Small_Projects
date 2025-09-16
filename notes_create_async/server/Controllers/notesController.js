const { default: mongoose } = require("mongoose");
const { notesModel } = require("../Models/notesModels");

// console.log(Object.keys(notesModel.__proto__), "...notesModel");


const fetchAllNotesController = async (req, res) => {
    try {

        const fetchAllNotes = await notesModel.find()

        // console.log(fetchAllNotes, "...fetch all");

        return res.status(200).json({
            success: true,
            message: "Fetch all notes successfully !!",
            notes: fetchAllNotes
        })

    } catch (error) {
        console.log(error, "...Error catch block fetchAllNotesController");
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const createNotesController = async (req, res) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "title or Content Not Found please enter" })
        }

        const isNotesExists = await notesModel.findOne({ title })


        if (isNotesExists) {
            return res.status(400).json({ success: false, message: "title already found please enter different !" })
        }

        const newNotes = await notesModel.create({
            title: title,
            content: content
        })

        return res.status(201).json({
            success: true,
            message: "new Notes created successfully !!",
            notes: newNotes
        })

    } catch (error) {
        console.log(error, "...Error catch block createNotesController");
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const updateNotesController = async (req, res) => {
    try {

        const id = req.params.id
        // console.log(id, "...req id");

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid object format please enter in valid ObjectId format" })
        }

        // console.log(req.body, "...req.body");

        const updatedNotes = await notesModel.findByIdAndUpdate(id, req.body, { new: true })
        // console.log(notesById, "...notesById");

        if (!updatedNotes) {
            return res.status(400).json({ success: false, message: "Notes not found" })
        }

        return res.status(200).json({ success: true, message: "Notes foundSuccessFully", notes: updatedNotes })

    } catch (error) {
        console.log(error, "...Error catch block updateNotesController");
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const deleteNotesController = async (req, res) => {
    try {

        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid object format please enter in valid ObjectId format" })
        }

        const note = await notesModel.findByIdAndDelete(id)
        if (!note) {
            return res.status(400).json({ success: false, message: "Note not found" })
        }

        return res.status(200).json({ success: true, message: "Note delete successfully!!", note: note })

    } catch (error) {
        console.log(error, "...Error catch block deleteNotesController");
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

module.exports = {
    fetchAllNotesController,
    createNotesController,
    updateNotesController,
    deleteNotesController
}
