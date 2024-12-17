// OrderForm.js
import React, { useState } from 'react';

const OrderForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('An error occurred while placing the order.');
    }
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleOrder}>
        <div>
          <label htmlFor='productId'>Product ID:</label>
          <input
            type='text'
            id='productId'
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='quantity'>Quantity:</label>
          <input
            type='number'
            id='quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
