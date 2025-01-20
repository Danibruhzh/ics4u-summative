import { useStoreContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddToCart({ movie, className }) {
    const navigate = useNavigate();
    const { cart, setCart, user, purchases } = useStoreContext();

        useEffect(() => {
            if (user) {
                localStorage.setItem(user.uid, JSON.stringify(cart.toJS()));
            }
        });

        const add = () => {
            if (user) {
                if (!purchases.has(String(movie.id))) {
                    setCart((prevCart) => prevCart.set(String(movie.id), { title: movie.original_title, poster: movie.poster_path, id: movie.id }));
                }
            } else {
                navigate('/login');
            }
        }

        const text = () => {
            if (cart.has(String(movie.id))) {
                return "Added";
            } else if (purchases.has(String(movie.id))) {
                return "Purchased";
            } else {
                return "Add to Cart";
            }
        };

    return (
        <button className={className} onClick={() => add()}>{text()}</button>
    )
}

export default AddToCart