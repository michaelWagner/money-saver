import api from './api'

const getSavings = () => {
  return api.get('/api/savings')
}

const updateSavings = (savingsId, item) => {
  return api.post('/api/savings', {savingsId, item})
}

export {
  getSavings,
  updateSavings,
}
