const express = require("express")
const app = express()
const cors = require("cors")
const explanationsRouter = require("./controllers/explanationsrouter")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use("/api/rappakalja", explanationsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app