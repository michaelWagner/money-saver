import api from './api'

const createSavings = (title) => {
  return api.post('/api/savings', { title });
};

const getSavings = () => {
  return api.get('/api/savings')
}

const updateSavings = (savingsId, item) => {
  return api.post(`/api/savings/${savingsId}`, { item })
}

export {
  createSavings,
  getSavings,
  updateSavings,
}
