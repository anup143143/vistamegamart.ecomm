import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faSearch, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logImge from '../assets/Logo.png';

export const Header = ({ cartcount, setsearch, cartItems = [], handleCartAction, search }) => {
  const [Visible, setVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [inputValue, setInputValue] = useState(search || '');
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  // Sync input with search prop when it changes
  useEffect(() => {
    setInputValue(search || '');
  }, [search]);

  // Clear search when navigating to a new page
  useEffect(() => {
    setInputValue('');
    setsearch('');
  }, [location.pathname, setsearch]);

  const handleCheckout = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    
    }, 5000); 
  };
  const handleClick = () => {
    setVisible(!Visible);
  };
  
  const handleClose = () => {
    setVisible(false);
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setsearch(value);
  };

  const removeFromCart = (id) => {
    handleCartAction(id, 'remove');
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="Header-seciton">
    <nav className="navbar-section">
      <div className="logo">
        <Link to="/">
        <img src={logImge} alt="logoimge" className='logo'/>
        </Link>
      
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/">All</Link></li>
          <li><Link to="/platforms">Platforms</Link></li>
          <li><Link to="/tags">Tags</Link></li>
          <li><Link to="/developers">Developers</Link></li>
          <li><Link to="/publishers">Publishers</Link></li>
          <li><Link to="/stores">Stores</Link></li>
        </ul>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search" />
      </div>
      <div className="right-section">
        <div className="cart-icons">
          <button className="cart-btn" onClick={toggleCart}>
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            <p>{cartcount}</p>
          </button>
        </div>
      </div>
      <div className="bar">
        <button className='open-btn' onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} className="menu-icon" />
        </button>
      </div>
    </nav>
      
     
    {Visible && (
        <div className="sidebar">
          <button className="close-icon" onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <ul>
            <li><Link to="/" onClick={handleClose}>All</Link></li>
            <li><Link to="/platforms" onClick={handleClose}>Platforms</Link></li>
            <li><Link to="/tags" onClick={handleClose}>Tags</Link></li>
            <li><Link to="/developers" onClick={handleClose}>Developers</Link></li>
            <li><Link to="/publishers" onClick={handleClose}>Publishers</Link></li>
            <li><Link to="/stores" onClick={handleClose}>Stores</Link></li>
          </ul>
        </div>
      )}
      
      {/* Cart Dropdown - Only new classes added here */}
      {cartVisible && (
        <div className="cart-modal">
          <div className="cart-modal-header">
            <h3>Your Cart ({cartcount} items)</h3>
            <button className="cart-close-btn" onClick={toggleCart}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          
          <div className="cart-modal-items">
            {cartItems.length === 0 ? (
              <p className="cart-empty-msg">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-modal-item">
                    <img src={item.background_image} alt={item.name} className="cart-item-img" />
                    
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      
                      <div className="cart-qty-control">
                        <span className="cart-qty">items:{item.quantity}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                
                <div className="cart-total-section">
                  <div className="cart-total-row">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="cart-checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                  {showAlert && <div className="checkout-alert">Checkout is currently not available</div>}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;