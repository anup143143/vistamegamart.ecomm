import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'; // ✅ ADD

export const All = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('-rating');
  const [filters, setFilters] = useState({
    platform: '',
    genre: '',
    dateRange: ''
  });

  const navigate = useNavigate(); // ✅ ADD
  const { handleAddcart, search } = useOutletContext();

  const fetchGames = useCallback(() => {
    setLoading(true);
    setError(null);

    let url = `https://api.rawg.io/api/games?key=a7e73dfc5f1e4f8684ddb80f2f6146a0&page=${page}&ordering=${sortBy}`;

    if (filters.platform) url += `&platforms=${filters.platform}`;
    if (filters.genre) url += `&genres=${filters.genre}`;
    if (filters.dateRange) {
      const currentYear = new Date().getFullYear();
      if (filters.dateRange === 'this-year') {
        url += `&dates=${currentYear}-01-01,${currentYear}-12-31`;
      } else if (filters.dateRange === 'last-year') {
        url += `&dates=${currentYear - 1}-01-01,${currentYear - 1}-12-31`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results || []);
        setTotalPages(Math.ceil(data.count / 20));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load games. Please try again later.');
        setLoading(false);
      });
  }, [page, sortBy, filters.platform, filters.genre, filters.dateRange]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [games, search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  if (loading && page === 1) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchGames}>Retry</button>
      </div>
    );
  }

  return (
    <div className="all-games-container">
      {/* Filters */}
      <div className="games-controls">
        <div className="filter-group">
          <label>Platform:</label>
          <select name="platform" value={filters.platform} onChange={handleFilterChange}>
            <option value="">All Platforms</option>
            <option value="4">PC</option>
            <option value="18">PlayStation 4</option>
            <option value="1">Xbox One</option>
            <option value="7">Nintendo Switch</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Genre:</label>
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">All Genres</option>
            <option value="4">Action</option>
            <option value="5">RPG</option>
            <option value="3">Adventure</option>
            <option value="2">Shooter</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Release:</label>
          <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
            <option value="">All Time</option>
            <option value="this-year">This Year</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="-rating">Top Rated</option>
            <option value="-released">Newest</option>
            <option value="released">Oldest</option>
            <option value="-metacritic">Best Reviews</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      {/* Games */}
      <div className="store-container">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div
              key={game.id}
              className="store-card"
              onClick={() => navigate(`/game/${game.id}`)} // ✅ CLICK NAVIGATION
            >
              <img src={game.background_image} alt={game.name} loading="lazy" />

              <div className="game-details">
                <div className="game-title">
                  <h3>{game.name}</h3>
                </div>

                <div className="game-rating-container">
                  <div className="rating-bar">
                    <div
                      className="rating-fill"
                      style={{ width: `${(game.rating / game.rating_top) * 100}%` }}
                    ></div>
                  </div>
                  <span>{game.rating.toFixed(1)}/{game.rating_top}</span>
                </div>

                <div className="game-price">
                  <p className="price">${(game.rating * 50).toFixed(2)} USD</p>
                </div>

                <div className="game-tag">
                  <span className="tag">Games</span>
                </div>

                <div className="platform-tags">
                  {game.platforms?.slice(0, 3).map(p => (
                    <span key={p.platform.id} className="platform-tag">
                      {p.platform.name}
                    </span>
                  ))}
                </div>

                {/* ✅ BUTTON FIX */}
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 IMPORTANT
                    handleAddcart(game);
                  }}
                >
                  Add to Cart
                </button>

                <p className="description">
                  {game.released
                    ? `Released: ${new Date(game.released).toLocaleDateString()}`
                    : 'Coming Soon'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No games found matching your criteria</p>
            <button className='clear' onClick={() => {
              setFilters({ platform: '', genre: '', dateRange: '' });
              search('');
            }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredGames.length > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            &laquo; Previous
          </button>

          <span>Page {page} of {totalPages}</span>

          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default All;