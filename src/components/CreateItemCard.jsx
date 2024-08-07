import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateItemCard = ({ addItem }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && price) {
      addItem(title, parseFloat(price));
      setTitle('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-item-card">
      <input
        type="text"
        placeholder="Item Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Item Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

CreateItemCard.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default CreateItemCard;
