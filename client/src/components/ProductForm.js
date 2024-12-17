import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, price, quantity };

    const response = await fetch('/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      console.log('Product added successfully');
    } else {
      console.error('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Product Name'
        required
      />
      <input
        type='number'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder='Product Price'
        required
      />
      <input
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder='Product Quantity'
        required
      />
      <button type='submit'>Add Product</button>
    </form>
  );
};

export default ProductForm;
