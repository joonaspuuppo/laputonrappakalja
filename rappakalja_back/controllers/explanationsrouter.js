const explanationsRouter = require("express").Router()

let explanations = []

explanationsRouter.get("/", (request, response) => {
    response.json(explanations)
})

explanationsRouter.post("/", (request, response) => {
    try {
        const explanation = request.body
        if (explanation.content === "!reset") {
            explanations = []
        } else if (explanations.map(e => e.player).includes(explanation.player)) {
            explanations.forEach(e => {
                e.player === explanation.player
                    ? e.content = explanation.content
                    : e
            })
        } else {
            explanations.push(explanation)
        }
        response.status(204).send()
    } catch (exception) {
        next(exception)
    }
    
})

module.exports = explanationsRouter