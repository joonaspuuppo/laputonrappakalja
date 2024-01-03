import axios from 'axios'
const baseUrl = '/api'

const addPlayer = async (playerName, gameName) => {
  const response = await axios.post(`${baseUrl}/games/add-player`, { playerName, gameName })
  return response.data
}

const addPoints = async (id, pointsToAdd) => {
  const response = await axios.post(`${baseUrl}/players/${id}/points`, { pointsToAdd })
  return response.data
}

const getPlayers = async (id) => {
  const response = await axios.get(`${baseUrl}/games/${id}/players`)
  return response.data
}

const getGame = async (name) => {
  const response = await axios.get(`${baseUrl}/games/game`, { name })
  return response.data
}

const addExplanation = async (id, explanation) => {
    const response = await axios.post(`${baseUrl}/players/${id}/explanation`, { explanation })
    return response.data
}

const deleteGame = async (id) => {
  const response = await axios.delete(`${baseUrl}/games/${id}`)
  return response.data
}

export default { getPlayers, getGame, addPlayer, addPoints, addExplanation, deleteGame}