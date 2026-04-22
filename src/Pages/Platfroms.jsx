import React, { useEffect, useState } from 'react';

const API_KEY = 'a7e73dfc5f1e4f8684ddb80f2f6146a0';

export const Platform = () => {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const fetchPlatforms = fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);

    Promise.all([fetchGames, fetchPlatforms])
      .then(([resGames, resPlatforms]) => {
        if (!resGames.ok) {
          throw new Error(`HTTP error! status: ${resGames.status}`);
        }
        if (!resPlatforms.ok) {
          throw new Error(`HTTP error! status: ${resPlatforms.status}`);
        }
        return Promise.all([resGames.json(), resPlatforms.json()]);
      })
      .then(([dataGames, dataPlatforms]) => {
        setGames(dataGames.results);
        setPlatforms(dataPlatforms.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader-container">
      <p>Loading platforms and games...</p>
    </div>
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="platform-container">
      <h1 className="platform-title">Explore Gaming Platforms and Games</h1>
      <p className="platform-subtitle">Discover information about various gaming platforms and the games available on them.</p>

      <div className="platforms-list">
        <h2>Popular Platforms</h2>
        <div className="platform-cards-grid">
          {platforms.slice(0, 6).map((platform) => (
            <div className="platform-card" key={platform.id}>
              <h3 className="platform-name">{platform.name}</h3>
              <p className="platform-game-count">Games: {platform.games_count}</p>
              {platform.image_background && (
                <div className="platform-image-background" style={{ backgroundImage: `url(${platform.image_background})` }}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="games-list">
        <h2>Featured Games</h2>
        <div className="games-grid">
          {games.slice(0, 6).map((game) => (
            <div className="game-card" key={game.id}>
              <img src={game.background_image} alt={game.name} className="game-image" />
              <h3 className="game-name">{game.name}</h3>
              <p className="game-rating">Rating: ⭐ {game.rating}</p>
              <div className="platform-tags">
                {game.platforms?.slice(0, 3).map((item) => (
                  <span className="platform-tag" key={item.platform.id}>
                    {item.platform.name}
                  </span>
                ))}
              </div>
              <p className="game-released">Released: {game.released}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Platform;