import React, { useEffect, useState } from "react";


const API_KEY = "a7e73dfc5f1e4f8684ddb80f2f6146a0";
const DEVELOPERS_API = `https://api.rawg.io/api/developers?key=${API_KEY}`;

export const Developers = () => { 
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch(DEVELOPERS_API)
      .then((res) => res.json())
      .then((data) => {
        setDevelopers(data.results);
      })
      .catch((error) => console.error("Error fetching developers:", error));
  }, []);

  return (
    <div className="developers-page">
      <h2 className="developers-title">Top Game Developers</h2>
      <div className="developers-list">
        {developers.map((developer) => (
          <div key={developer.id} className="developer-card">
            {developer.image_background && (
              <img
                src={developer.image_background}
                alt={developer.name}
                className="developer-image"
              />
            )}
            <div className="developer-info">
              <h3>{developer.name}</h3>
              <p>Total Games: {developer.games_count}</p>
              <div className="developer-games">
                {developer.games.slice(0, 3).map((game) => (
                  <span key={game.id} className="game-chip">
                    {game.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
