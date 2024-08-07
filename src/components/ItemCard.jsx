import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

const ItemCard = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM_CARD',
    item: { id: item.id, price: item.price },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`item-card ${isDragging ? 'dragging' : ''}`}>
      <h3>{item.title}</h3>
      <p>${item.price.toFixed(2)}</p>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCard;