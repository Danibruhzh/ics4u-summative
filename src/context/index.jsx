import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Map } from 'immutable';
import { auth } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState(Map());
    const [genres, setGenres] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        onAuthStateChanged(auth, user => {
          if (user) {
            setUser(user);
            // const sessionCart = localStorage.getItem(user.uid);
            // if (sessionCart) {
            //   setCart(Map(JSON.parse(sessionCart)));
            // }
          }
        //   setLoading(false);
        });
      }, [])

    return (
        <StoreContext.Provider value={{ cart, setCart, genres, setGenres, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}