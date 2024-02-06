import { useContext } from "react";
import { CartContext } from "../context/cartProvider";

export default function useDrinks() {
    return useContext(CartContext)
}
