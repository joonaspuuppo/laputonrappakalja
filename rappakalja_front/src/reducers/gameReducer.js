import {createSlice} from '@reduxjs/toolkit'
import rappakaljaService from '../services/rappakalja'
import { setGameOver as playerGameOver } from './playerReducer'
import { _setGameOver as playersGameOver } from './playersReducer'

const gameSlice = createSlice({
  name: 'game',
  initialState: {},
  reducers: {
    setGameOn: (state, action) => {
      return {
        name: action.payload.name,
        id: action.payload.id
      }
    },
    setGameOver: (state, action) => {
        return {}
    },
  }
})

export const {setGameOn, setGameOver} = gameSlice.actions

export const endGame = (id) => {
  return async dispatch => {
    await rappakaljaService.deleteGame(id)
    dispatch(playerGameOver())
    dispatch(playersGameOver())
    dispatch(setGameOver())
  }
}

export default gameSlice.reducer