import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import logoimge from '../assets/Logo.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setAlertMessage('Email is required.');
      setShowAlert(true);
    } else {
      setAlertMessage('You have successfully subscribed to the newsletter!');
      setShowAlert(true);
      setEmail('');
    }
    
    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 10000);
  };

  return (
    <footer className="footer">
      {/* Custom Alert */}
      {showAlert && (
        <div className="custom-alert">
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="footer-top">
        <div className="footer-col footer-left">
          <img src={logoimge} alt="logoimage" className='logo' />
          <p className="tagline">Trusted by Global Gaming Legends & Leading PlatformsYour Gateway 
            to the World's Leading Game Platforms</p>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#"><FontAwesomeIcon icon={faXTwitter} /></a>
          </div>
        </div>

        {/* Other footer columns remain the same */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">All</Link></li>
            <li><Link to="/platforms">Platforms</Link></li>
            <li><Link to="/tags">Tags</Link></li>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/publishers">Publishers</Link></li>
            <li><Link to="/stores">Stores</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Game Categories</h4>
          <ul>
            <li><a href="#">Action</a></li>
            <li><a href="#">Adventure</a></li>
            <li><a href="#">Racing</a></li>
            <li><a href="#">Shooter</a></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Subscribe to Newsletter</h4>
          <p>Get updates on new games and offers.</p>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className='submit'>Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Let's Play. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;