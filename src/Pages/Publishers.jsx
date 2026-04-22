import React, { useEffect, useState } from "react";


const API_KEY = "a7e73dfc5f1e4f8684ddb80f2f6146a0";

export const Publishers = () => { 
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/publishers?key=${API_KEY}`);
        const data = await response.json();
        setPublishers(data.results);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };

    fetchPublishers();
  }, []);

  return (
    <div className="publishers-page">
      <h2 className="publishers-heading">Top Game Publishers</h2>
      <div className="publishers-container">
        {publishers.map((publisher) => (
          <div className="publisher-card" key={publisher.id}>
            {publisher.image_background && (
              <img
                src={publisher.image_background}
                alt={publisher.name}
                className="publisher-img"
              />
            )}
            <h3 className="publisher-name">{publisher.name}</h3>
            <p className="games-count">Games: {publisher.games_count}</p>
            <div className="top-games">
              <h4>Popular Games:</h4>
              <ul>
                {publisher.games.slice(0, 3).map((game) => (
                  <li key={game.id}>{game.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publishers;
