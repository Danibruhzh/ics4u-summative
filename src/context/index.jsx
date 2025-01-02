import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [name, setName] = useState("Guest");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [cart, setCart] = useState(Map());
    const [genres, setGenres] = useState([]);
    const [logged, setLogged] = useState(false);

    return (
        <StoreContext.Provider value={{ name, setName, lname, setLname, email, setEmail, cart, setCart, genres, setGenres, logged, setLogged }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}