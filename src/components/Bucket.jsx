// src/components/Bucket.jsx

import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { getItems, getSavings } from '../api';
import ItemCard from './ItemCard';
import CreateItemCard from './CreateItemCard';
import './Bucket.css';

const Bucket = () => {
  const [items, setItems] = useState([]);
  const [bucketItems, setBucketItems] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => addItemToBucket(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchTotalSavings = async () => {
      try {
        const response = await getSavings();
        setTotalSavings(response.data.total_savings);
      } catch (error) {
        console.error('Error fetching savings:', error);
      }
    };

    fetchItems();
    fetchTotalSavings();
  }, []);

  const addItemToBucket = (item) => {
    setBucketItems((prevItems) => [...prevItems, item]);
    setTotalSavings((prevTotal) => prevTotal + item.price);
  };

  return (
    <div className="bucket">
      <h2>Bucket</h2>
      <div ref={drop} className={`dropzone ${isOver ? 'over' : ''}`}>
        {bucketItems.map((item, index) => (
          item && item.price &&
          <div key={index} className="bucket-item">
            {item.title}: ${item.price?.toFixed(2)}
          </div>
        ))}
      </div>
      <h3>Total Savings: ${totalSavings?.toFixed(2)}</h3>
      <CreateItemCard addItem={addItemToBucket} />
      <div className="item-list">
        {items.map((item) => (
          item &&
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Bucket;
