import { StoreProvider } from "./context"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import GenreView from './views/GenreView'
import DetailView from './views/DetailView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import HomeView from './views/HomeView'
import MoviesView from './views/MoviesView'
import Feature from './components/Feature'
import CartView from './views/CartView'
import SettingsView from './views/SettingsView'

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/movies" element={<MoviesView />}>
            <Route path="" element={<Feature />} />
            <Route path="genre/:genre_id" element={<GenreView />} />
            <Route path="details/:id" element={<DetailView />} />
          </Route>
          <Route path="/cart" element={<CartView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
