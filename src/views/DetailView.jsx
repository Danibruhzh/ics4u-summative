import './DetailView.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreContext } from '../context'

function DetailView() {
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const { cart, setCart, logged } = useStoreContext();
    const params = useParams();

    useEffect(() => {
        (async function getMovie() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`
            );
            setMovie(response.data);
            setGenres(response.data.genres);
            setTrailers(response.data.videos.results.filter((video) => video.type === "Trailer"));
        })();
    }, []);

    return (
        <div className="movie-detail">
            <h1 className="movie-title-2">{movie.original_title}</h1>
            <p className='tagline'>{movie.tagline}</p>
            <p className="movie-overview">{movie.overview}</p>
            <div className='movie-genres'>
                <strong>Genres:</strong>{genres.map((obj, index) => (<span key={index}> {obj.name}{index < genres.length - 1 ? ', ' : ''}</span>))}
            </div>
            <button className="add-to-cart" onClick={() => { logged ? setCart((prevCart) => prevCart.set(movie.id, { title: movie.original_title, poster: movie.poster_path })) : alert("Login first!") }}>{`${cart.has(movie.id) && logged ? 'Added' : 'Buy'}`}</button>
            <div className="movie-info">
                <div className='release-date'><strong>Release Date:</strong> {movie.release_date}</div>
                <div className='runtime'><strong>Runtime:</strong> {movie.runtime} minutes</div>
                <div className='budget'><strong>Budget:</strong> ${movie.budget}</div>
                <div className='revenue'><strong>Revenue:</strong> ${movie.revenue} </div>
                <div className='rating'><strong>Overall Rating:</strong> {movie.vote_average}/10 ({movie.vote_count} ratings)</div>
            </div>
            {movie.poster_path && (
                <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                />
            )}
            <div className="trailers-section">
                <h2>Trailers</h2>
                <div className="trailers-grid">
                    {trailers.map((trailer) => (
                        <div key={trailer.id} className="trailer-tile">
                            <a
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noop
                                ener noreferrer"
                            >
                                <img
                                    className="trailer-thumbnail"
                                    src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                                    alt={trailer.name}
                                />
                                <h3>{trailer.name}</h3>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailView