import React, { useEffect, useState } from 'react';


export const Stores = () => { 
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch('https://api.rawg.io/api/stores?key=a7e73dfc5f1e4f8684ddb80f2f6146a0');
        const data = await res.json();
        setStores(data.results);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="stores-container">
      <h2 className="stores-title">Game Stores</h2>
      <div className="stores-grid">
        {stores.map(store => (
          <div key={store.id} className="store-card">
            <div className="store-image">
              {store.image_background && (
                <img src={store.image_background} alt={store.name} />
              )}
            </div>
            <div className="store-info">
              <h3>{store.name}</h3>
              <p>Games Available: {store.games_count}</p>
              <a href={`https://${store.domain}`} target="_blank" rel="noreferrer">
                Visit Store
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
