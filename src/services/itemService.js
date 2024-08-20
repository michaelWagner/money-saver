import api from './api'

const getItems = () => {
  return api.get('/api/items')
}

const addItem = (item) => {
  return api.post('/api/items', item)
}

const deleteItem = (itemId) => {
  return api.delete(`/api/items/${itemId}`)
}

const updateItem = (item) => {
  return api.put(`/api/items/${item.id}`, item)
}

export {
  getItems,
  addItem,
  deleteItem,
  updateItem,
}
