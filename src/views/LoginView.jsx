import './LoginView.css'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../images/movie feature.png'
import { auth, firestore } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useStoreContext } from '../context'

function LoginView() {
    const { setUser } = useStoreContext();
    const email = useRef('');
    const password = useRef('');
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    const loginWithEmail = async (event) => {
        event.preventDefault();
        try {
            const user = (await signInWithEmailAndPassword(auth, email.current.value.trim(), password.current.value.trim())).user;
            setUser(user);

            navigate('/');
        } catch (error) {
            alert("Wrong email or password!")
        }
    }

    const loginWithGoogle = async (event) => {
        event.preventDefault();
        try {
            const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
            setUser(user);
            try {
                const docRef = doc(firestore, "users", user.uid);
                console.log(user.uid);
                const info = await getDoc(docRef);
                if (info.data()) {
                    navigate("/");
                } else{
                    await setDoc(docRef, {genres: []});
                    navigate("/settings");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            alert("Error signing in!");
        }
    }

    useEffect(() => {
        updateForm();
    })

    const updateForm = () => {
        setValid(!email.current.value.trim() == '' && !password.current.value.trim() == '');
    }

    return (
        <div className='login-container'>
            <img src={Background} alt="Movie background" className="background" />
            <div>
                <form action="/">
                    <button className="home" id="home-button" type="submit">Home</button>
                </form>
            </div>
            <div>
                <h1 className="title">
                    Freakflix
                </h1>
            </div>
            <div className="island">
                <h2>SIGN IN</h2>
                <form>
                    <div className="field">
                        <input type="text" ref={email} onChange={updateForm} required />
                        <label>Email or phone number</label>
                    </div>
                    <div className="field">
                        <input type="password" ref={password} onChange={updateForm} required />
                        <label>Password</label>
                    </div>
                    <button onClick={loginWithEmail} disabled={!valid} className={!valid ? 'disabled-button' : ''}>Sign In</button>

                    <div className="help">
                        <div className="remember">
                            <input type="checkbox" id="remember" />
                            <label>Remember me</label>
                        </div>
                        <a href="https://blockblast.org/" target='_blank'>Need help?</a>
                    </div>
                </form>
                <p>New to Freakflix? <a href="/register">Create account</a></p>
                <button className="sign-in-with-google" onClick={loginWithGoogle}>Sign in with Google</button>
            </div>
        </div>
    )
}

export default LoginView