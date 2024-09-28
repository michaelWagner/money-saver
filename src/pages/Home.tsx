import { useState, useEffect } from 'react'
import Bucket from '../components/Bucket'
import Dropdown from '../components/Dropdown'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import NewSavingsForm from '../components/NewSavingsForm'
import ItemCards from '../components/ItemCards'
import CreateItemCard from '../components/CreateItemCard'
import { Item, Savings } from '../types'
import { getItems, getSavings } from '../services'

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [items, setItems] = useState<Item[]>([])
  const [savingsLists, setSavingsLists] = useState<Savings[]>([])
  const [selectedSavings, setSelectedSavings] = useState<Savings | null>(null)
  const [modalState, setModalState] =
    useState<{ isSavingsModalOpen: boolean, isCreateItemModalOpen: boolean }>(
      { isSavingsModalOpen: false, isCreateItemModalOpen: false }
    )

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
      setIsLoading(true)
      try {
        const { data } = await getSavings()

        setSavingsLists((prev) => {
          if (!prev.length || prev.length && prev.length > data.length) {
            setSelectedSavings(data[0]) // set default selected savings
          } else if (prev.length && prev.length < data.length) {
            setSelectedSavings(data[data.length - 1]) // set new selected savings
          }
          return data
        })
      } catch (error) {
        console.error('Error fetching savings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
    fetchSavingsLists()
  }, [...Object.values(modalState)])

  const handleSelect = (selected: Savings) => {
    const selectedId = selected.id
    const savings = savingsLists.find(list => list.id === selectedId) || null
  
    setSelectedSavings(savings)
  }

  // To open a specific modal
  const openModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }))
  }

  // To close a specific modal
  const closeModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }))
  }

  return (
    <div className='bg-background'>
      <div className="w-full container p-4 mx-auto mb-6">
        <div className='flex justify-between items-center'>
          <Dropdown
            options={savingsLists}
            onSelect={handleSelect}
            value={selectedSavings}
            className='w-64'
            customOptions={[{ title: 'Add New Savings...'}]}
            onCustomSelect={() => openModal('isSavingsModalOpen')} />

          <button className="px-4 py-2 bg-primary text-font-button font-bold rounded-lg hover:bg-primary-hover transition duration-200" onClick={() => openModal('isCreateItemModalOpen')}>
            Edit Savings
          </button>
        </div>
      </div>

      {/* TODO Add Edit & Delete buttons here */}

      {isLoading &&
        <div className="container h-48 flex justify-center items-center mx-auto text-center text-font text-xl font-semibold mt-4">
          <Loading size={8} className="text-font" />
        </div>
      }

      {!isLoading && selectedSavings &&
        <div className="container mx-auto text-center text-font text-xl font-semibold mb-4">
          <Bucket
            items={items}
            onSavingsUpdate={(updatedSavings) => setSelectedSavings({...selectedSavings, total: updatedSavings.total})}
            savings={selectedSavings} />
          <h3 className="text-xl font-semibold mt-4">Total Savings: ${selectedSavings?.total}</h3>
        </div>}

      {!isLoading &&
        <div className="container mx-auto p-4">
          <div className="max-w-md mx-auto text-center">
            <button
              className="w-48 py-3 mt-4 bg-secondary text-white font-bold rounded hover:bg-secondary-hover transition duration-200"
              onClick={() => openModal('isCreateItemModalOpen')}>
              Create New Item
            </button>
          </div>
          <ItemCards items={items} />
        </div>
      }

      {/* Modals */}
      {modalState.isSavingsModalOpen && (
        <Modal title="Create New Savings Bucket" isOpen={modalState.isSavingsModalOpen} onClose={() => closeModal('isSavingsModalOpen')}>
          <NewSavingsForm onSuccess={async (newSavings) => closeModal('isSavingsModalOpen')} />
        </Modal>
      )}

      {modalState.isCreateItemModalOpen && (
        <Modal title="Create New Item" isOpen={modalState.isCreateItemModalOpen} onClose={() => closeModal('isCreateItemModalOpen')}>
          <CreateItemCard onSuccess={() => closeModal('isCreateItemModalOpen')}/>
        </Modal>
      )}
    </div>
  )
}

export default Home
