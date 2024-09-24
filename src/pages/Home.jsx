import { useState, useEffect } from 'react'
import Bucket from '../components/Bucket'
import Dropdown from '../components/Dropdown'
import Modal from '../components/Modal'
import NewSavingsForm from '../components/NewSavingsForm'
import { getItems, getSavings } from '../services'

const Home = () => {
  const [items, setItems] = useState([])
  const [savingsLists, setSavingsLists] = useState([])
  const [selectedSavingsList, setSelectedSavingsList] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(true)

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

  return (
    <div className='bg-gray-800'>
      <div className="w-full max-w-sm mx-auto mb-6">
        {savingsLists.length > 0 &&
          <Dropdown
            options={savingsLists}
            onSelect={handleSelect}
            value={selectedSavingsList}
            customOptions={[{ title: 'Add New Savings...'}]}
            onCustomSelect={() => setIsModalOpen(true)} />}
      </div>

      {selectedSavingsList &&
        <Bucket
          items={items}
          savingsList={selectedSavingsList} />}

      {isModalOpen &&
        <Modal title="Create New Savings Bucket" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NewSavingsForm onSavingsCreated={() => setIsModalOpen(false)} />
        </Modal>}
    </div>
  )
}

export default Home
