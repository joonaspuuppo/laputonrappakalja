const Game = require("../models/game")
const Player = require("../models/player")

const gameRouter = require("express").Router()

gameRouter.get("/", async (request, response, next) => {
    try {
        const games = await Game.find({}).populate("players")
        response.json(games)
    } catch (exception) {
        next(exception)
    }
})

gameRouter.get("/game", async (request, response, next) => {
    const gameName = request.body.name
    const game = Game.find({name: gameName}).populate("players")
})

// Add player to game. If game doesn't exist, create it
gameRouter.post("/new-player", async (request, response, next) => {
    const playerName = request.body.player
    const gameName = request.body.game
    try {
        let game = await Game.find({name: gameName})
        if (!game) {
            const newGame = new Game({
                name: gameName,
                players: []
            })
            game = await game.save()
        }

        const newPlayer = new Player({
            name: playerName,
            game: game._id,
            points: 0
        })

        const player = await newPlayer.save()
        const updatedGame = await Game.findByIdAndUpdate(game._id, {$push: {players: player._id}}, {new: true})
        response.json(updatedGame)
    } catch (exception) {
        next(exception)
    }
})

gameRouter.delete("/:id", async (request, response, next) => {
    try {
        const game = Game.findById(request.params.id)
        if (!game) response.status(204).end()
        game.players.foreach(player => Player.deleteOne({_id: player._id}))
        // TODO
    } catch (exception) {
        next(exception)
    }

})

module.exports = gameRouter