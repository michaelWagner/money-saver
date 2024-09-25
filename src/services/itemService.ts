import api from './api'
import { Item } from '../types'

const getItems = () => {
  return api.get('/api/items')
}

const addItem = (item: Item) => {
  return api.post('/api/items', item)
}

const deleteItem = (itemId: number) => {
  return api.delete(`/api/items/${itemId}`)
}

const updateItem = (item: Item) => {
  return api.put(`/api/items/${item.id}`, item)
}

export {
  getItems,
  addItem,
  deleteItem,
  updateItem,
}
