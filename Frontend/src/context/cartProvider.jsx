import { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from 'prop-types';
import { actionTypes } from "../actions/cart.actions"
import { cartReducer, cartInitialState } from "../reducers/cart.reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    const [totalPriceCart, setTotalPriceCart] = useState(0)

    function addToCart(product) {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: product })
    }
    function removeOneFromCart(product) {
        dispatch({ type: actionTypes.REMOVE_ONE_FROM_CART, payload: product })
    }
    function removeAllFromCart(product) {
        dispatch({ type: actionTypes.REMOVE_ALL_FROM_CART, payload: product })

    }
    function clearCart(product) {
        dispatch({ type: actionTypes.CLEAR_CART, payload: {} })
    }
    
    useEffect(() => {
        let updatedPrice = 0
        state.cartItems.forEach((product) => {
            updatedPrice += product.quantity * product.price
        })
        setTotalPriceCart(updatedPrice)
    }, [state])

    function sendOrder() {
        alert(JSON.stringify({
            state,
            totalPrice: totalPriceCart
        }))
    }

    const cartValues = {
        cart: state,
        addToCart,
        removeOneFromCart,
        removeAllFromCart,
        clearCart,
        totalPriceCart,
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