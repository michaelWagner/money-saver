import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'

const ItemCard = ({ item, addItemToBucket }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM_CARD',
    item: { id: item.id, price: item.price },
    end: (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        addItemToBucket(draggedItem)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-4 bg-gray-800 text-white rounded-lg shadow-md ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p>${item.price.toFixed(2)}</p>
    </div>
  )
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  addItemToBucket: PropTypes.func.isRequired,
}

export default ItemCard
