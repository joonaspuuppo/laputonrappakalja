import axios from 'axios'
const baseUrl = '/api/rappakalja'

const getExplanations = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addExplanation = async (explanation) => {
    const response = await axios.post(baseUrl, explanation)
    return response.data
}

export default { getExplanations, addExplanation }