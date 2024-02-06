import { useContext } from "react";
import { CartContext } from "../context/cartProvider";

export default function useCart() {
    return useContext(CartContext)
}
