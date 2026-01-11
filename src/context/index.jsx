import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Map } from 'immutable';
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(Map());
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState(Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        setUser(user);
        const sessionCart = localStorage.getItem(user.uid);
        if (sessionCart) {
          setCart(Map(JSON.parse(sessionCart)));
        }

        const docRef = doc(firestore, "users", user.uid);
        const userInfo = await getDoc(docRef);
        if (userInfo.exists()) {
          const getGenres = userInfo.data().genres;
          setGenres(getGenres);
          if (userInfo.data().purchases) {
            const getPurchases = Map(userInfo.data().purchases);
            setPurchases(getPurchases);
          } else {
            setPurchases(Map());
          }
        }
      }
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <h1> loading ...</h1>
  }

  return (
    <StoreContext.Provider value={{ cart, setCart, genres, setGenres, user, setUser, purchases, setPurchases, loading, setLoading }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(StoreContext);
}