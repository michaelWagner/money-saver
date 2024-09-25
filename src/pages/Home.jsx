import { useState, useEffect } from 'react'
import Bucket from '../components/Bucket'
import Dropdown from '../components/Dropdown'
import Modal from '../components/Modal'
import NewSavingsForm from '../components/NewSavingsForm'
import ItemCard from '../components/ItemCard'
import CreateItemCard from '../components/CreateItemCard'
import { getItems, getSavings } from '../services'

const Home = () => {
  const [items, setItems] = useState([])
  const [savingsLists, setSavingsLists] = useState([])
  const [selectedSavingsList, setSelectedSavingsList] = useState(null)
  const [modalState, setModalState] = useState({ isSavingsModalOpen: false, isCreateItemModalOpen: false })


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems()

        setItems(response.data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    const fetchSavingsLists = async () => {
      try {
        const { data } = await getSavings()

        setSavingsLists(data)
        if (data.length) setSelectedSavingsList(data[0]) // set default selected savings
      } catch (error) {
        console.error('Error fetching savings:', error)
      }
    }

    fetchItems()
    fetchSavingsLists()
  }, [])

  const handleSelect = (selected) => {
    const selectedId = selected.id
    const selectedList = savingsLists.find(list => list.id === parseInt(selectedId))

    setSelectedSavingsList(selectedList)
  }

  // To open a specific modal
  const openModal = (modalName) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }))
  }

  // To close a specific modal
  const closeModal = (modalName) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }))
  }

  return (
    <div className='bg-gray-800'>
      <div className="w-full max-w-sm mx-auto mb-6">
        {savingsLists.length > 0 &&
          <Dropdown
            options={savingsLists}
            onSelect={handleSelect}
            value={selectedSavingsList}
            customOptions={[{ title: 'Add New Savings...'}]}
            onCustomSelect={() => openModal('isSavingsModalOpen')} />}
      </div>

      {selectedSavingsList &&
        <div className="text-center text-white text-xl font-semibold mb-4">
          <Bucket
            items={items}
            onSavingsUpdate={(updatedSavingsList) => setSelectedSavingsList(updatedSavingsList)}
            savingsList={selectedSavingsList} />
          <h3 className="text-xl font-semibold mt-4">Total Savings: ${selectedSavingsList?.total}</h3>
        </div>}

      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto text-center">
          <button className="w-48 py-3 mt-4 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition duration-200" onClick={() => openModal('isCreateItemModalOpen')}>
            Create New Item
          </button>
          {/* <CreateItemCard /> */}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            item && <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Modals */}
      {modalState.isSavingsModalOpen && (
        <Modal title="Create New Savings Bucket" isOpen={modalState.isSavingsModalOpen} onClose={() => closeModal('isSavingsModalOpen')}>
          <NewSavingsForm onSavingsCreated={() => closeModal('isSavingsModalOpen')} />
        </Modal>
      )}

      {modalState.isCreateItemModalOpen && (
        <Modal title="Create New Item" isOpen={modalState.isCreateItemModalOpen} onClose={() => closeModal('isCreateItemModalOpen')}>
          <CreateItemCard />
        </Modal>
      )}
    </div>
  )
}

export default Home
