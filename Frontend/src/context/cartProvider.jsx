import { createContext, useReducer } from "react";
import PropTypes from 'prop-types';
import { actionTypes } from "../actions/cart.actions"
import { cartReducer, cartInitialState } from "../reducers/cart.reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) =>{

    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    function addToCart(product) {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: product })
    }
    function removeOneFromCart(idProduct) {
        dispatch({ type: actionTypes.REMOVE_ONE_FROM_CART, payload: { idProduct } })
    }
    function removeAllFromCart(idProduct) {
        dispatch({ type: actionTypes.REMOVE_ALL_FROM_CART, payload: { idProduct } })

    }
    function clearCart(idProduct) {
        dispatch({ type: actionTypes.CLEAR_CART, payload: { idProduct } })
    }
    function totalPrice() {
        let updatedPrice = 0;
        state.cartItems.forEach((product) => {
            updatedPrice += product.quantity * product.price;
            state.totalPrice = updatedPrice
        });
        return updatedPrice
    }

function sendOrder(){
    alert(JSON.stringify(state))
}

    const cartValues = {
        cart: state,
        addToCart,
        removeOneFromCart,
        removeAllFromCart,
        clearCart,
        totalPrice,
        sendOrder
    }
    return (
        <CartContext.Provider value={cartValues}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}