import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import ItemCard from './ItemCard';
import CreateItemCard from './CreateItemCard';
import axios from 'axios';

const Bucket = ({ token }) => {
  const [items, setItems] = useState([]);
  const [bucketItems, setBucketItems] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    // Fetch items and total savings from the backend
    const fetchItems = async () => {
      const response = await axios.get('/api/items', { headers: { Authorization: `Bearer ${token}` } });
      setItems(response.data);
    };

    const fetchTotalSavings = async () => {
      const response = await axios.get('/api/savings', { headers: { Authorization: `Bearer ${token}` } });
      setTotalSavings(response.data.total_savings);
    };

    fetchItems();
    fetchTotalSavings();
  }, [token]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM_CARD',
    drop: (item) => addToBucket(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addToBucket = async (item) => {
    setBucketItems([...bucketItems, item]);
    setTotalSavings(totalSavings + item.price);
    await axios.post('/api/savings', { item }, { headers: { Authorization: `Bearer ${token}` } });
    // Show success animation here (like confetti)
  };

  const addItem = async (title, price) => {
    const newItem = { id: items.length + 1, title, price };
    setItems([...items, newItem]);
    await axios.post('/api/items', newItem, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <div className="bucket">
      <h2>Bucket</h2>
      <div ref={drop} className={`dropzone ${isOver ? 'over' : ''}`}>
        {bucketItems.map((item, index) => (
          <div key={index} className="bucket-item">
            {item.title}: ${item.price.toFixed(2)}
          </div>
        ))}
      </div>
      <h3>Total Savings: ${totalSavings.toFixed(2)}</h3>
      <CreateItemCard addItem={addItem} />
      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

Bucket.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Bucket;
