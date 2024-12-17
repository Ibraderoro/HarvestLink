// App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import OrderForm from './components/OrderForm';
import ProductList from './components/ProductList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    // Logic to handle search can be implemented here (e.g., filtering products)
  };

  return (
    <Router>
      <div className='App'>
        <h1>Farmer's E-Commerce Platform</h1>
        <nav className='navbar'>
          <ul>
            <li>
              <NavLink to='/' activeClassName='active' exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/order-form' activeClassName='active'>
                Order Form
              </NavLink>
            </li>
            <li>
              <NavLink to='/products' activeClassName='active'>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' activeClassName='active'>
                Login
              </NavLink>
            </li>
          </ul>
          <form className='search-bar' onSubmit={handleSearchSubmit}>
            <input
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={handleSearch}
            />
            <button type='submit'>Search</button>
          </form>
        </nav>

        <Routes>
          <Route
            path='/'
            element={<h2>Welcome to the Farmer's E-Commerce Platform!</h2>}
          />
          <Route path='/order-form' element={<OrderForm />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/login' element={<h2>Login Page</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
