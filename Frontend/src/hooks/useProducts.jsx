import { useContext } from "react";
import { productContext } from "../context/productsProvider";

export default function useProducts() {
  return useContext(productContext);
}