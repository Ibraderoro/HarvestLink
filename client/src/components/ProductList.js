// ProductList.js
import React, { useState, useEffect } from 'react';
import './styles/ProductList.css';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='product-list'>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products: {error}</p>
      ) : (
        <>
          <h2>Available Products</h2>
          <div className='filters'>
            <p>Showing results for: "{searchQuery}"</p>
          </div>
          <ul>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li key={product.id} className='product-item'>
                  <img src={product.imageUrl} alt={product.name} width='100' />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductList;
