import './MoviesView.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Genre from '../components/Genre'
import { Outlet } from 'react-router-dom'

function MoviesView() {
    return (
        <div className="layout">
            <Header className="header" />
            <Genre className="sidebar" />
            <div className="main-content">
                <Outlet /> {/* This will display nested routes */}
            </div>
            <Footer className="footer" />
        </div>
    );
}

export default MoviesView