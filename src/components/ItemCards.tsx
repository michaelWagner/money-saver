import ItemCard from './ItemCard'
import { Item } from '../types/Item'

interface ItemCardsProps {
  items: Item[]
}

const ItemCards: React.FC<ItemCardsProps> = ({ items }) => {
  return (
    <div className="mt-6 grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        item && <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemCards
