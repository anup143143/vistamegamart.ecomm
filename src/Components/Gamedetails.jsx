
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Gamedetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${id}?key=a7e73dfc5f1e4f8684ddb80f2f6146a0`)
      .then(res => res.json())
      .then(data => setGame(data))
      .catch(() => setError("Failed to load"));
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!game) return <h2>Loading...</h2>;

  return (
    <div className="game-details-page">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {/* 🔥 TOP SECTION */}
      <div className="top-section">

        {/* LEFT IMAGE */}
        <div className="left">
          <img src={game.background_image} alt={game.name} />
        </div>

        {/* RIGHT DETAILS */}
        <div className="right">
          <h1>{game.name}</h1>

          <p><strong>⭐ Rating:</strong> {game.rating}</p>
          <p><strong>📅 Released:</strong> {game.released}</p>

          {/* Platforms */}
          <div className="platforms">
            {game.platforms?.map((p) => (
              <span key={p.platform.id} className="platform-tag">
                {p.platform.name}
              </span>
            ))}
          </div>

          {/* Price */}
          <h2 className="price">
            ${(game.rating * 50).toFixed(2)}
          </h2>

          {/* Add to Cart */}
          <button className="add-btn">
            Add To Cart
          </button>
        </div>

      </div>

      {/* 🔥 DESCRIPTION FULL WIDTH */}
      <div
        className="game-description"
        dangerouslySetInnerHTML={{ __html: game.description }}
      />

    </div>
  );
};

export default Gamedetails;