import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Map } from 'immutable';
import { auth } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [name, setName] = useState("Guest");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [cart, setCart] = useState(Map());
    const [genres, setGenres] = useState([]);
    const [logged, setLogged] = useState(false);
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
        <StoreContext.Provider value={{ name, setName, lname, setLname, email, setEmail, cart, setCart, genres, setGenres, logged, setLogged, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}