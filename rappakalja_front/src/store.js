import { configureStore } from "@reduxjs/toolkit"
import playersReducer from "./reducers/playersReducer"
import gamereducer from "./reducers/gamereducer"
import playerReducer from "./reducers/playerReducer"

const store = configureStore({
    reducer: {
      players: playersReducer,
      player: playerReducer,
      game: gamereducer
    }
})

export default store