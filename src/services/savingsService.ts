import api from './api'
import { Item } from '../types'

const createSavings = (title: string) => {
  return api.post('/api/savings', { title });
};

const getSavings = () => {
  return api.get('/api/savings')
}

const updateSavings = (savingsId: number, item: Item) => {
  return api.post(`/api/savings/${savingsId}`, { item })
}

export {
  createSavings,
  getSavings,
  updateSavings,
}
