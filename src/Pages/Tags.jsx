import React, { useEffect, useState } from "react";


export const Tags = () => { 
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => { 
      try {
        const res = await fetch(
          `https://api.rawg.io/api/tags?key=a7e73dfc5f1e4f8684ddb80f2f6146a0`
        );
        const data = await res.json();
        setTags(data.results);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="tags-container">
      <h2 className="tags-title">Game Tags</h2>
      <div className="tags-grid">
        {tags.map((tag) => (
          <div key={tag.id} className="tag-card">
            <img
              src={
                tag.image_background ||
                "https://via.placeholder.com/300x180?text=No+Image"
              }
              alt={tag.name}
              className="tag-image"
            />
            <div className="tag-info">
              <h3 className="tag-name">{tag.name}</h3>
              <p className="tag-count">{tag.games_count.toLocaleString()} games</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags; 