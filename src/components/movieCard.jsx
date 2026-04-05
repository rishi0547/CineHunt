import React from "react";

const movieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
  onSelect,
}) => {
  return (
    <button
      type="button"
      className="movie-card w-full text-left cursor-pointer transition-transform duration-200 hover:-translate-y-1"
      onClick={onSelect}
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star Icon" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <span>•</span>
        <p className="lang">
          {original_language ? original_language.toUpperCase() : "N/A"}
        </p>
        <span>•</span>
        <p className="year">
          {release_date ? release_date.slice(0, 4) : "N/A"}
        </p>
      </div>
    </button>
  );
};

export default movieCard;
