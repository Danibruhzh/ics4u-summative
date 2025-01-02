import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import axios from "axios";
import './Feature.css'

function Feature() {
    const [shuffledMovies, setShuffledMovies] = useState([]);
    const navigate = useNavigate();
    const [clickCount, setClickCount] = useState(0);
    const [currentTransform, setCurrentTransform] = useState(0);
    const { cart, setCart, logged } = useStoreContext();

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setShuffledMovies(shuffle(response.data.results));
        })();
    }, []);

    function loadMovie(id) {
        navigate(`/movies/details/${id}`);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shift() {
        let ratio = Math.floor(((window.innerWidth) - 60) / 440);

        if (19 - (3 + clickCount) + (3 - ratio) >= 0) {
            const newTransform = currentTransform - 440;
            setCurrentTransform(newTransform);
            setClickCount(clickCount + 1);
        } else {
            setCurrentTransform(0);
            setClickCount(0);
        }
    };

    return (
        <div>
            <div className="movie-list-container">
                <h1 className="movie-list-title"> Popular </h1>
                <div className="movie-list-wrapper">
                    <div className="movie-list" style={{ transform: `translateX(${currentTransform}px)` }}>
                        {shuffledMovies.map((movie, index) => (

                            <div className="movie-list-item" key={index}>
                                <img
                                    className="movie-list-item-image"
                                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                    alt="No Image"
                                />
                                <span className="movie-list-item-title">{movie.original_title}</span>
                                <p className="movie-list-item-desc">{movie.overview}</p>
                                <button className="movie-list-item-button" onClick={() => { loadMovie(movie.id) }}>Details</button>
                                <button className="movie-list-item-button rent" onClick={() => { logged ? setCart((prevCart) => prevCart.set(movie.id, { title: movie.original_title, poster: movie.poster_path })) : alert("Login first!") }}>{`${cart.has(movie.id) && logged ? 'Added' : 'Buy'}`}</button>
                            </div>
                        ))}
                    </div>
                    <i className="fa-solid fa-arrow-right arrow" onClick={() => shift()}></i>
                </div>
            </div>
        </div>
    );
}


export default Feature