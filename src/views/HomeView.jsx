import './HomeView.css'
import Feature from '../components/Feature'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HomeView() {
    return (
        <>
            <Header />
            <div className='container'>
                <div className="content-container">
                    <Hero />
                    <Feature />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomeView