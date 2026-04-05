import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/search";
import Spinner from "./components/spinner";
import MovieCard from "./components/movieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm],
  );

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies.");
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);
    } catch (error) {
      console.error("Movie fetch failed:", error);
      setErrorMessage("Failed to fetch movies.please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main id="top" className="scroll-smooth">
      <div className="pattern" />

      <Navbar />

      <div className="wrapper pt-28 sm:pt-32">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies" id="trending">
          <h2 className="mt-10">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={() => setSelectedMovie(movie)}
                />
              ))}
            </ul>
          )}
        </section>

        {selectedMovie && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedMovie(null)}
          >
            <div
              className="w-full max-w-2xl rounded-2xl bg-dark-100 p-5 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2>{selectedMovie.title}</h2>
                  <p className="mt-1 text-light-200">
                    {selectedMovie.release_date
                      ? selectedMovie.release_date.slice(0, 4)
                      : "N/A"}
                    {"  •  "}
                    {selectedMovie.original_language
                      ? selectedMovie.original_language.toUpperCase()
                      : "N/A"}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-md bg-light-100/10 px-3 py-1 text-sm text-white"
                  onClick={() => setSelectedMovie(null)}
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[220px_1fr]">
                <img
                  src={
                    selectedMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                      : "./no-movie.png"
                  }
                  alt={selectedMovie.title}
                  className="h-auto w-full rounded-lg"
                />

                <div className="space-y-3 text-light-200">
                  <p>
                    <span className="font-semibold text-white">Rating:</span>{" "}
                    {selectedMovie.vote_average
                      ? selectedMovie.vote_average.toFixed(1)
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Votes:</span>{" "}
                    {selectedMovie.vote_count ?? "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      Popularity:
                    </span>{" "}
                    {selectedMovie.popularity
                      ? Math.round(selectedMovie.popularity)
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Overview:</span>{" "}
                    {selectedMovie.overview || "No overview available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
