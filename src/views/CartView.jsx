import { useStoreContext } from "../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./CartView.css"

function CartView() {
    const { cart, setCart, user, purchases, setPurchases } = useStoreContext();
    const navigate = useNavigate();
    const cartItems = [];

    useEffect(() => {
        localStorage.setItem(user.uid, JSON.stringify(cart.toJS()));
    });

    cart.forEach((movie, id) => {
        cartItems.push(
            <div className="cart-item" key={id}>
                <h2>{movie.title}</h2>
                <img
                    className="movie-poster3"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.title}
                />
                <button onClick={() => remove(id)}>Remove</button>
            </div>
        );
    })

    const remove = (id) => {
        setCart((prevCart) => prevCart.delete(id))
    }

    async function checkout() {
        const docRef = doc(firestore, "users", user.uid);
        const updatedPurchases = purchases.merge(cart);
        await updateDoc(docRef, { purchases: updatedPurchases.toJS() });
        setCart((prevCart) => prevCart.clear());
        localStorage.setItem(user.uid, {});
        setPurchases(updatedPurchases);
        alert('Thank you for checking out!');
        navigate('/');
    }

    if (cartItems.length > 0) {
        return (
            <div>
                <h1 className="shopping-cart">Shopping Cart</h1>
                <div className="button-container2">
                    <button className="home-button" onClick={() => navigate('/')}>Home</button>
                    <button className="movies-button" onClick={() => navigate('/movies')}>Find more movies</button>
                </div>
                <div className="cart-list">
                    {cartItems}
                </div>
                <button className="checkout-button" onClick={() => checkout()}>Checkout</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="shopping-cart">Shopping Cart</h1>
                <div className="button-container2">
                    <button className="home-button" onClick={() => navigate('/')}>Home</button>
                    <button className="movies-button" onClick={() => navigate('/movies')}>Find more movies</button>
                </div>
                <div className="cart-list">
                    No items in cart! Add some movies!
                </div>
            </div>
        )
    }
}

export default CartView