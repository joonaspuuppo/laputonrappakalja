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
    const game = await Game.findOne({name: gameName}).populate("players")
    response.json(game)
})

gameRouter.get("/:id/players", async (request, response, next) => {
    try {
        const game = await Game.findById(request.params.id).populate("players")
        if (!game) return response.status(404).end()
        response.json(game.players)
    } catch (exception) {
        next(exception)
    }
})

// Add player to game. If game doesn't exist, create it
gameRouter.post("/new-player", async (request, response, next) => {
    const playerName = request.body.player
    const gameName = request.body.game
    try {
        let game = await Game.findOne({name: gameName}).populate("players")
        if (!game) {
            const newGame = new Game({
                name: gameName,
                players: []
            })
            game = await newGame.save()
        } else {
            const playerExists = game.players.some(player => player.name === playerName)
            if (playerExists) return response.json(game)
        }

        const newPlayer = new Player({
            name: playerName,
            game: game._id,
            points: 0
        })

        const player = await newPlayer.save()
        const updatedGame = await Game.findByIdAndUpdate(game._id, {$push: {players: player._id}}, {new: true}).populate("players")
        response.json(updatedGame)
    } catch (exception) {
        next(exception)
    }
})

// Delete game and each player in game.players
gameRouter.delete("/:id", async (request, response, next) => {
    try {
        const game = await Game.findById(request.params.id).populate("players")

        if (!game) return response.status(204).end()

        for (const player of game.players) {
            await Player.findOneAndDelete({_id: player._id})
        }

        await Game.findOneAndDelete({_id: request.params.id})
        response.status(204).end();
    
    } catch (exception) {
        next(exception)
    }
})

module.exports = gameRouter