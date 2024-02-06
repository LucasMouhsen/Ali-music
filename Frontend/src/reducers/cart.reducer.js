import { actionTypes } from "../actions/cart.actions"
export const cartInitialState = {
    cartItems: [],
    totalPrice: 0,
}

export function cartReducer(state, { payload, type }) {
    const { id } = payload;
    let productsInCart = state.cartItems.find((item) => item.id === id);
    
    switch (type) {
        case actionTypes.ADD_TO_CART:
            if (productsInCart) {
                const updatedCartItems = state.cartItems.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };

                    }
                    return item;
                });
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                payload.quantity = 1;
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload],
                };
            }
        case actionTypes.REMOVE_ONE_FROM_CART:
            if (productsInCart.quantity > 1) { /* ACA HAY UN ERROR */
                const updatedCartItems = state.cartItems.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                    return item;
                });
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
        case actionTypes.REMOVE_ALL_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== id)
            };
        case actionTypes.CLEAR_CART:
            return cartInitialState;

    }
}