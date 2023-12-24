const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3},
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    points: { type: Number, required: true, min: 0},
    definition: String,
})

playerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Player = mongoose.model("Player", playerSchema)

module.exports = Player