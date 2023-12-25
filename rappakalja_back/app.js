const express = require("express")
const app = express()
const cors = require("cors")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const logger = require('./utils/logger')
const gameRouter = require("./controllers/gamerouter")
const playerRouter = require("./controllers/playerrouter")
require('dotenv').config()

logger.info("connecting to", process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message)
    })

app.use(cors())
app.use(express.json())
app.use("/api/games", gameRouter)
app.use("/api/players", playerRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app