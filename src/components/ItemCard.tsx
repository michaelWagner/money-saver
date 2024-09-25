import { useDrag } from 'react-dnd'
import Item from '../types/Item'

interface ItemCardProps {
  item: Item
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM_CARD',
    item,
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

export default ItemCard
