import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';

function Header() {
    const { name, lname, setName, logged, setLogged } = useStoreContext();
    const navigate = useNavigate();

    if (logged === false) {
        return (
            <div className="header">
                <div className="header-container">
                    <div className="logo-container">
                        <div className="logo">
                            <h1 onClick={() => navigate('/')}>Freakflix</h1>
                        </div>
                    </div>
                    <div className='welcome'>
                        <p>Welcome, {name}!</p>
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
                        <p>Welcome, {name} {lname}!</p>
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
                            <form>
                                <button className="cart" onClick={() => navigate('/cart')}>Cart</button>
                            </form>
                        </div>
                    </div>
                    <div className="settings-button-container">
                        <div className="settings-button">
                            <form>
                                <button className="settings" onClick={() => navigate('/settings')}>Settings</button>
                            </form>
                        </div>
                    </div>
                    <div className="logout-button-container">
                        <div className="logout-button">
                            <form>
                                <button className="logout" onClick={() => { setLogged(false); setName("Guest") }}>Logout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header