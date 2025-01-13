import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header() {
    const { user, setUser } = useStoreContext();
    const navigate = useNavigate();
    console.log(user);

    function logout() {
        setUser(null);
        signOut(auth);
    }

    if (!user) {
        return (
            <div className="header">
                <div className="header-container">
                    <div className="logo-container">
                        <div className="logo">
                            <h1 onClick={() => navigate('/')}>Freakflix</h1>
                        </div>
                    </div>
                    <div className='welcome'>
                        <p>Welcome, Guest!</p>
                    </div>
                    <div className="menu-container">
                        <div className="menu">
                            <form className="menu-list">
                                <a className="menu-list-item" onClick={() => navigate('/')}>Home</a>
                                <a className="menu-list-item" onClick={() => navigate('/movies')}>Movies</a>
                            </form>
                        </div>
                    </div>
                    <div className="search-bar-container">
                        <div className="search-bar">
                            <form>
                                <input type="search" className="search" placeholder="Search Movies or Shows" />
                            </form>
                        </div>
                    </div>
                    <div className="sign-in-button-container">
                        <div className="sign-in-button">
                            <form>
                                <button className="sign-in" onClick={() => navigate('/login')}>Sign-in</button>
                            </form>
                        </div>
                    </div>
                    <div className="register-button-container">
                        <div className="register-button">
                            <form>
                                <button className="register" onClick={() => navigate('/register')}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="header">
                <div className="header-container">
                    <div className="logo-container">
                        <div className="logo">
                            <h1 onClick={() => navigate('/')}>Freakflix</h1>
                        </div>
                    </div>
                    <div className='welcome'>
                        <p>Welcome, {user.displayName}!</p>
                    </div>
                    <div className="menu-container">
                        <div className="menu">
                            <form className="menu-list">
                                <a className="menu-list-item" onClick={() => navigate('/')}>Home</a>
                                <a className="menu-list-item" onClick={() => navigate('/movies')}>Movies</a>
                            </form>
                        </div>
                    </div>
                    <div className="search-bar-container">
                        <div className="search-bar">
                            <form>
                                <input type="search" className="search" placeholder="Search Movies or Shows" />
                            </form>
                        </div>
                    </div>
                    <div className="card-button-container">
                        <div className="cart-button">
                            <button className="cart" onClick={() => navigate('/cart')}>Cart</button>
                        </div>
                    </div>
                    <div className="settings-button-container">
                        <div className="settings-button">
                            <button className="settings" onClick={() => navigate('/settings')}>Settings</button>
                        </div>
                    </div>
                    <div className="logout-button-container">
                        <div className="logout-button">
                            <button className="logout" onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header