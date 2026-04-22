// Layout.jsx
import { useState } from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');

  const handleAddcart = (game) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === game.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          price: game.rating * 50,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCartHandler = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <>
      <Header
        cartcount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        setsearch={setSearch}
        cartItems={cartItems}
        handleCartAction={removeFromCartHandler} // Changed prop name to match Header's expectation
        search={search}
      />
      <main>
        <Outlet context={{ handleAddcart, search, setSearch }} />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;