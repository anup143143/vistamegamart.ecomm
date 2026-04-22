import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from './Footer';

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');

  // Add game to cart
  const handleAddToCart = (game) => {
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
          price: game.rating * 50, // Example pricing logic
          quantity: 1
        }
      ];
    });
  };

  // Handle all cart actions (remove, update quantity, etc.)
  const handleCartAction = (id, action) => {
    switch(action) {
      case 'remove':
        setCartItems(prev => prev.filter(item => item.id !== id));
        break;
      // Add more cases for other actions if needed
      default:
        console.warn(`Unknown cart action: ${action}`);
    }
  };

  return (
    <>
      <Header 
        cartcount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        setsearch={setSearch}
        cartItems={cartItems}
        handleCartAction={handleCartAction}
        search={search}
      />
      
      <main>
        <Outlet context={{ handleAddToCart, search, setSearch }} />
      </main>
      
      <Footer />
    </>
  );
};

export default Layout;