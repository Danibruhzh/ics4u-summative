import './LoginView.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../images/movie feature.png'

function LoginView() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function login(event) {
        event.preventDefault();
        if (password === "1234567890") {
            navigate('/ ');
        } else {
            alert("Wrong password!");
        }
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
                <form onSubmit={(event) => { login(event) }}>
                    <div className="field">
                        <input type="text" required />
                        <label>Email or phone number</label>
                    </div>
                    <div className="field">
                        <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
                        <label>Password</label>
                    </div>
                    <button type="submit">Sign In</button>
                    <div className="help">
                        <div className="remember">
                            <input type="checkbox" id="remember" />
                            <label for="remember">Remember me</label>
                        </div>
                        <a href="#">Need help?</a>
                    </div>
                </form>
                <p>New to Freakflix? <a href="/register">Create account</a></p>
            </div>
        </div>
    )
}

export default LoginView