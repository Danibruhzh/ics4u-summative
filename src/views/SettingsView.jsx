import './SettingsView.css'
import Background from '../images/movie feature.png'
import { useStoreContext } from '../context'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import axios from 'axios';

function SettingsView() {
    const { genres, setGenres, user, setUser } = useStoreContext();
    const [genresAll, setGenresAll] = useState([]);

    const [genreMap, setGenreMap] = useState([]);
    const name = user.displayName.split(" ");
    // const firstName = useRef('');
    // const lastName = useRef('');

    const [firstName, setFirstName] = useState(name[0]);
    const [lastName, setLastName] = useState(name[1]);



    const navigate = useNavigate();

    useEffect(() => {
        (async function getGenres() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setGenresAll(response.data.genres.filter(genre => genre.name !== "Documentary" && genre.name !== "Drama" && genre.name !== "Romance" && genre.name !== "TV Movie"));
            setGenreMap(genres);
            console.log(user);
        })();
    }, []);

    const update = async (event) => {
        event.preventDefault();
        if (genreMap.length >= 10) {
            let fullList = genresAll;
            const newGenres = fullList.filter((item) => genreMap.some((check) => check.id === item.id));
            setGenres(newGenres);
            console.log(newGenres);
            if (user.providerData[0].providerId !== "google.com") {
                if (firstName.trim() && lastName.trim()) {
                    await updateProfile(user, { displayName: `${firstName.trim()} ${lastName.trim()}` });
                    setUser((prev) => ({ ...prev, displayName: `${firstName.trim()} ${lastName.trim()}` }));
                    const docRef = doc(firestore, "users", user.uid);
                    await updateDoc(docRef, { genres: newGenres, });
                } else if (firstName.trim()) {
                    const lname = user.displayName.split(" ")[1];
                    await updateProfile(user, { displayName: `${firstName.trim()} ${lname}` });
                    setUser((prev) => ({ ...prev, displayName: `${firstName.trim()} ${lname}` }));
                    const docRef = doc(firestore, "users", user.uid);
                    await updateDoc(docRef, { genres: newGenres });
                } else if (lastName.trim()) {
                    const fname = user.displayName.split(" ")[0];
                    await updateProfile(user, { displayName: `${fname} ${lastName.trim()}` });
                    setUser((prev) => ({ ...prev, displayName: `${fname} ${lastName.trim()}` }));
                    const docRef = doc(firestore, "users", user.uid);
                    await updateDoc(docRef, { genres: newGenres });
                } else {
                    const docRef = doc(firestore, "users", user.uid);
                    await updateDoc(docRef, { genres: newGenres });
                }
            }
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
        console.log(genreMap);
    };

    function logout() {
        setUser(null);
        signOut(auth);
    }

    console.log(firstName);

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
                    <label>Current First Name:</label>
                    <p>{name[0]}</p>
                </div>
                <div className="current-field">
                    <label>Current Last Name:</label>
                    <p>{name[1]}</p>
                </div>
                <div className="current-field">
                    <label>Current Email:</label>
                    <p>{user.email}</p>
                </div>

                <form>
                    {(user.providerData[0].providerId !== "google.com") && (
                        <div>
                            <div className="field">
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                <label>Update First Name</label>
                            </div>
                            <div className="field">
                                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                                <label>Update Last Name</label>
                            </div>
                        </div>
                    )}
                    <button onClick={update}>Update Settings</button>
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
        </div>
    )
}

export default SettingsView