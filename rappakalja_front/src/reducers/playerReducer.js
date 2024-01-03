import {createSlice} from '@reduxjs/toolkit'
import rappakaljaService from '../services/rappakalja'
import { setGameOn } from './gamereducer'
import {getPlayers} from './playersReducer'

const playerSlice = createSlice({
  name: 'player',
  initialState: {},
  reducers: {
    setPlayer: (state, action) => {
      return action.payload
    },
    setGameOver: (state, action) => {
        return {}
    },
  }
})

export const {setPlayer, setGameOver} = playerSlice.actions

export const addPlayer = (playerName, gameName) => {
  return async dispatch => {
    const game = await rappakaljaService.addPlayer(playerName, gameName)
    dispatch(setGameOn({name: game.name, id: game.id}))
    dispatch(getPlayers(game.id))
    const player = game.players.find(p => p.name === playerName)
    dispatch(setPlayer(player))
  }
}

export default playerSlice.reducer