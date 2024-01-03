import {createSlice} from '@reduxjs/toolkit'
import rappakaljaService from '../services/rappakalja'

const playersSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    _setPlayers: (state, action) => {
      return action.payload.sort((a,b) => b.points - a.points)
    },
    _setGameOver: (state, action) => {
      return []
    },
    _addPoints: (state, action) => {
      const id = action.payload.id
      const pointsToAdd = action.payload.pointsToAdd
      const playerToUpdate = state.find(p => p.id === id)
      const updatedPlayer = {
        ...playerToUpdate,
        points: playerToUpdate.points + pointsToAdd
      }
      return state.map(p =>
        p.id !== id ? p : updatedPlayer
      ).sort((a,b) => b.points - a.points)
    },
    _addExplanation: (state, action) => {
      const id = action.payload.id
      const newExplanation = action.payload.explanation
      const playerToUpdate = state.find(p => p.id === id)
      const updatedPlayer = {
        ...playerToUpdate,
        explanation: newExplanation
      }
      return state.map(p =>
        p.id !== id ? p : updatedPlayer
      )
    }
  }
})

export const {_setPlayers, _setGameOver, _addPoints, _addExplanation} = playersSlice.actions

export const getPlayers = (id) => {
  return async dispatch => {
    const players = await rappakaljaService.getPlayers(id)
    dispatch(_setPlayers(players))
  }
}

export const addPoints = (id, pointsToAdd) => {
  return async dispatch => {
    await rappakaljaService.addPoints(id, pointsToAdd)
    dispatch(_addPoints({id, pointsToAdd}))
  }
}

export const addExplanation = (id, explanation) => {
  return async dispatch => {
    await rappakaljaService.addExplanation(id, explanation)
    dispatch(_addExplanation({id, explanation}))
  }
}

export default playersSlice.reducer