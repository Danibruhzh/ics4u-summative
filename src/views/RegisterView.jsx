import './RegisterView.css'
import Background from '../images/movie feature.png'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore} from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useStoreContext } from '../context'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterView() {
    const { setGenres, setUser } = useStoreContext();
    const [genresAll, setGenresAll] = useState([]);
    const [genreMap, setGenreMap] = useState([]);
    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');
    const [isChecked, setIsChecked] = useState(false);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async function getGenres() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setGenres(response.data.genres.filter(genre => genre.name !== "Documentary" && genre.name !== "Drama" && genre.name !== "Romance" && genre.name !== "TV Movie"));
            setGenresAll(response.data.genres.filter(genre => genre.name !== "Documentary" && genre.name !== "Drama" && genre.name !== "Romance" && genre.name !== "TV Movie"));
        })();
    }, []);

    const registerByEmail = async (event) => {
        event.preventDefault();
        if (genreMap.length >= 10) {
            let fullList = genresAll;
            const newGenres = fullList.filter((item) => genreMap.includes(item.id));
            setGenres(newGenres);
            try {
                const user = (await createUserWithEmailAndPassword(auth, email.current.value, password.current.value)).user;
                await updateProfile(user, { displayName: `${firstName.current.value} ${lastName.current.value}` });
                setUser(user);
                const docRef = doc(firestore, "users", user.uid);
                await setDoc(docRef, {genres: newGenres});
                navigate("/");
            } catch (error) {
                console.log(error);
                alert("Error creating account");
            }
        } else {
            alert("Please select at least 10 genres!");
        }
    }

    const registerByGoogle = async (event) => {
        event.preventDefault();
        if (genreMap.length >= 10) {
            let fullList = genresAll;
            const newGenres = fullList.filter((item) => genreMap.includes(item.id));
            setGenres(newGenres);
            try {
                const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
                setUser(user);
                const docRef = doc(firestore, "users", user.uid);
                await setDoc(docRef, {genres: newGenres});
                navigate("/");
            } catch (error) {
                alert("Error creating account");
            }
        } else {
            alert("Please select at least 10 genres!");
        }
    }

    const select = (genre) => {
        setGenreMap((prev) => {
            if (prev.includes(genre.id)) {
                return prev.filter((id) => id !== genre.id);
            } else {
                return [...prev, genre.id];
            }
        })
    };

    useEffect(() => {
        updateForm();
    })

    const updateForm = () => {
        setValid(!firstName.current.value.trim() == '' && !lastName.current.value.trim() == '' && !email.current.value.trim() == '' && !password.current.value.trim() == '' && (confirmPassword.current.value.trim() == password.current.value.trim()) && isChecked);
    }

    return (
        <div className='register-container'>
            <img src={Background} alt="Movie background" className="background" />
            <div>
                <form>
                    <button className="home" id="home-button" onClick={() => navigate('/')}>Home</button>
                </form>
            </div>

            <div>
                <h1 className="title">
                    Freakflix
                </h1>
            </div>

            <div className="island">
                <h2>CREATE ACCOUNT</h2>
                <form>
                    <div className="field">
                        <input type="text" ref={firstName} onChange={updateForm} required />
                        <label>First Name</label>
                    </div>
                    <div className="field">
                        <input type="text" ref={lastName} onChange={updateForm} required />
                        <label>Last Name</label>
                    </div>
                    <div className="field">
                        <input type="text" ref={email} onChange={updateForm} required />
                        <label>Email or phone number</label>
                    </div>
                    <div className="field">
                        <input type="password" ref={password} onChange={updateForm} required />
                        <label>Password</label>
                    </div>
                    <div className="field">
                        <input type="password" ref={confirmPassword} onChange={updateForm} required />
                        <label>Re-enter Password</label>
                    </div>
                    <button onClick={registerByEmail} disabled={!valid} className={!valid ? 'disabled-button' : ''}>Create Account</button>
                    <button onClick={registerByGoogle} disabled={!isChecked} className={!isChecked ? 'disabled-button' : ''}>Sign in with Google</button>
                    <div className="help">
                        <div className="terms">
                            <input type="checkbox" id="terms" checked={isChecked} onClick={() => { setIsChecked(!isChecked) }} />
                            <label> Agree to <a href="https://laws-lois.justice.gc.ca/eng/const/" target="_blank">Terms & Conditions</a></label>
                        </div>
                        <a href="#">Need help?</a>
                    </div>
                </form>
                <p>Already have an account? <a href="/login">Sign In</a></p>
                <div className="genre-selector">
                    <h3 className='selector-title'>Choose your prefered genres</h3>
                    {genresAll.map((genre) => (
                        <button key={genre.id} className={`selection ${genreMap.includes(genre.id) ? 'selected' : ''}`} onClick={() => {
                            select(genre);
                        }}>{genre.name}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RegisterView