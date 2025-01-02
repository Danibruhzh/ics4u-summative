import { useNavigate } from "react-router-dom";
import './Genre.css'
import { useStoreContext } from "../context";

function Genre() {
    const { genres } = useStoreContext();
    const navigate = useNavigate();

    function loadGenre(id) {
        navigate(`genre/${id}`);
    }

    return (
        <div className="genre-container">
            <ol className="genre-list">
                {genres
                    .filter(genre => genre.name !== "Documentary" && genre.name !== "Drama" && genre.name !== "Romance" && genre.name !== "TV Movie")
                    .slice(0, 20)
                    .map((genre) => (
                        <ul key={genre.id} className="genre" onClick={() => { loadGenre(genre.id) }}>
                            {genre.name}
                        </ul>
                    ))}
            </ol>
        </div>
    )
}

export default Genre