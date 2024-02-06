import { actionTypes } from "../actions/cart.actions"
export const cartInitialState = {
    cartItems: [],
    totalPrice: 0,
}

export function cartReducer(state, { payload, type }) {
    // destructuramos el payload para traer el id del producto
    const {id} = payload;
    // verificamos si el producto ya esta en el carrito
    let productsInCart = state.cartItems.find((item) => item.id === id);
    // ejecutamos el actionTypes
    switch (type) {
        case actionTypes.ADD_TO_CART:
            // verificamos si el producto esta en el carrito
            if (productsInCart) {
                // modificamos el cartItems
                const updatedCartItems = state.cartItems.map((item) => {
                    // buscamos el id que corresponda
                    if (item.id === id) {
                        return {
                            ...item,
                            //sumamos +1 en cantidad
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
                // si el producto no estaba, la cantidad es 1
                payload.quantity = 1;
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload],
                };
            }
        case actionTypes.REMOVE_ONE_FROM_CART:
            // verificamos si la cantidad es mayor a 1
            // verificamos si el producto esta en el carrito
            if (productsInCart && productsInCart?.quantity != 1) {
                // modificamos el cartItems
                const updatedCartItems = state.cartItems.map((item) => {
                    // buscamos el id que corresponda
                    if (item.id === id) {
                        return {
                            ...item,
                            //sumamos -1 en cantidad
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
                // buscamos el producto en el carrito
                const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
                return {
                    ...state,
                    // retornamos el carrito sin el producto
                    cartItems: updatedCartItems,
                };
            }
        case actionTypes.REMOVE_ALL_FROM_CART:
            // retornamos el carrito sin el producto
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== id)
            };
        case actionTypes.CLEAR_CART:
            const emptyCart = [];
            return {
                ...state,
                cartItems: emptyCart,
                totalPrice: 0,
            };

    }
}