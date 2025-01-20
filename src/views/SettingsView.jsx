import './SettingsView.css'
import Background from '../images/movie feature.png'
import { useStoreContext } from '../context'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import axios from 'axios';

function SettingsView() {
    const { genres, setGenres, user, setUser, purchases } = useStoreContext();
    const [genresAll, setGenresAll] = useState([]);
    const [genreMap, setGenreMap] = useState([]);
    const name = user.displayName.split(" ");
    const [firstName, setFirstName] = useState(name[0]);
    const [lastName, setLastName] = useState(name[1]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let valid = (!password || (password == confirmPassword && password.length >= 8));
    const purchasedList = [];
    const loginWithEmail = user.providerData[0].providerId !== "google.com";
    const navigate = useNavigate();

    useEffect(() => {
        (async function getGenres() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setGenresAll(response.data.genres.filter(genre => genre.name !== "Documentary" && genre.name !== "Drama" && genre.name !== "Romance" && genre.name !== "TV Movie"));
            setGenreMap(genres);
        })();
    }, []);

    const update = async (event) => {
        event.preventDefault();
        if (genreMap.length >= 10) {
            let fullList = genresAll;
            const newGenres = fullList.filter((item) => genreMap.some((check) => check.id === item.id));
            setGenres(newGenres);
            if (loginWithEmail) {
                if (firstName.trim() && lastName.trim()) {
                    await updateProfile(user, { displayName: `${firstName.trim()} ${lastName.trim()}` });
                    setUser((prev) => ({ ...prev, displayName: `${firstName.trim()} ${lastName.trim()}` }));
                }
            }
            const docRef = doc(firestore, "users", user.uid);
            await updateDoc(docRef, { genres: newGenres, });
            navigate("/");
        } else {
            alert("Please select at least 10 genres!");
        }
    }

    const select = (genre) => {
        setGenreMap((prev) => {
            if (prev.some(check => check.id == genre.id)) {
                return prev.filter((a) => a.id !== genre.id);
            } else {
                return [...prev, { id: genre.id, name: genre.name }];
            }
        })
    };

    function logout() {
        setUser(null);
        signOut(auth);
    }

    if (purchases) {
        purchases.forEach((movie, index) => {
            purchasedList.push(
                <div className="purchases-list-container" key={index} onClick={() => navigate(`/movies/details/${movie.id}`)}>
                    <img
                        className="purchased-item"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
                        alt="No Image"
                    />
                    <span className="purchased-item-title">{movie.title}</span>
                </div>
            );
        })
    };

    return (
        <div className='register-container'>
            <img src={Background} alt="Movie background" className="background" />
            {(!(user.providerData[0].providerId == "google.com" && genres.length < 10)) && (
                <div>
                    <button className="home" id="home-button" onClick={() => navigate('/')}>Home</button>
                </div>
            )}
            <div>
                <h1 className="title">
                    Freakflix
                </h1>
            </div>
            <div className="island">
                <h2>Settings</h2>
                <div className="current-field">
                    <p className='current-label'>Current First Name:</p>
                    <p>{name[0]}</p>
                </div>
                <div className="current-field">
                    <p className='current-label'>Current Last Name:</p>
                    <p>{name[1]}</p>
                </div>
                <div className="current-field">
                    <p className='current-label'>Current Email:</p>
                    <p>{user.email}</p>
                </div>
                <form>
                    <div>
                        <div className="field">
                            <input type="text" className={!loginWithEmail ? 'disabled-input' : ''} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            <label>Update First Name</label>
                        </div>
                        <div className="field">
                            <input type="text" className={!loginWithEmail ? 'disabled-input' : ''} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            <label>Update Last Name</label>
                        </div>
                        <div className="field">
                            <input type="text" className={!loginWithEmail ? 'disabled-input' : ''} value={password} onChange={(e) => { setPassword(e.target.value); if (!password) { setConfirmPassword("") } }} required />
                            <label>Update Password</label>
                        </div>
                        {(password) &&
                            <div className="field">
                                <input type="password" className={!loginWithEmail ? 'disabled-input' : ''} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <label>Confirm New Password</label>
                            </div>
                        }
                    </div>
                    <button onClick={update} disabled={!valid}>Update Settings</button>
                </form>
                <a className='logout2' onClick={() => { logout() }}>Logout</a>
                <div className="genre-selector">
                    <h3 className='selector-title'>Update your prefered genres</h3>
                    {genresAll.map((genre) => (
                        <button key={genre.id} className={`selection ${genreMap.some(check => check.id == genre.id) ? 'selected' : ''}`} onClick={() => {
                            select(genre);
                        }}>{genre.name}</button>
                    ))}
                </div>
            </div>
            <h2 className='purchases-header'>Your Past Purchases:</h2>
            <div className="purchases-container">
                {purchasedList}
            </div>
        </div>
    )
}

export default SettingsView