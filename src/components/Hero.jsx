import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import axios from "axios";
import './Hero.css';
import AddToCart from "./AddToCart";

function Hero() {
  const [movie, setMovie] = useState([]);
  const { cart, setCart, user } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async function getMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&page=${Math.floor(Math.random() * 2) + 1}`
      );
      setMovie(response.data.results[Math.floor(Math.random() * 20)]);
    })();
  }, []);

  function loadMovie(id) {
    navigate(`/movies/details/${id}`);
  }
  
  try {
    return (
      <div className="featured-content" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #111111), url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="featured-container">
          <h1 className="featured-title">{movie.original_title}</h1>
          <p className="featured-desc">{movie.overview}</p>
          <button className="featured-button watch" onClick={() => { loadMovie(movie.id) }}>Details</button>
          <AddToCart className="featured-button rent" movie={movie} />
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="featured-content" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #111111), url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="featured-container">
          <h1 className="featured-title">{movie.original_title}</h1>
          <p className="featured-desc">{movie.overview}</p>
          <button className="featured-button watch" onClick={() => { loadMovie(movie.id) }}>Details</button>
          <button className="featured-button rent" onClick={() => { user ? setCart((prevCart) => prevCart.set(movie.id, { title: movie.original_title, poster: movie.poster_path })) : alert("Login first!") }}>{`${cart.has(movie.id) && user ? 'Added' : 'Add to Cart'}`}</button>
        </div>
      </div>
    )
  }
}

export default Hero