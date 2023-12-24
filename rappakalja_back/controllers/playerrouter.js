const Game = require("../models/game")
const Player = require("../models/player")

const playerRouter = require("express").Router()


playerRouter.get("/", async (request, response) => {
    try {
        const players = await Player.find({}).populate("game")
        response.json(players)
    } catch (exception) {
        next(exception)
    }
})

playerRouter.post("/:id/definitions", async (request, response, next) => {
    try {
        const definition = request.body
        const updatedPlayer = await Player.findByIdAndUpdate(request.params.id, {definition: request.body.content}, {new: true})
        response.json(updatedPlayer)
    } catch (exception) {
        next(exception)
    }
})

playerRouter.post("/:id/points", async (request, response, next) => {
    try {
        const pointsToAdd = request.body.pointsToAdd
        const playerWithAddedPoints = await Player.findByIdAndUpdate(request.params.id, {$inc: {points: pointsToAdd}}, {new: true})
        response.json(playerWithAddedPoints)
    } catch (exception) {
        next(exception)
    }
})

module.exports = playerRouter