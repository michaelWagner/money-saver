import { useDrag } from 'react-dnd'
import { Item } from '../types/Item'

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
      className={
        `border text-center max-w-fit px-10 py-4 bg-card-bg text-font rounded-lg drop-shadow-lg cursor-pointer hover:bg-card-hover active:cursor-grabbing ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p>${item.price.toFixed(2)}</p>
    </div>
  )
}

export default ItemCard
