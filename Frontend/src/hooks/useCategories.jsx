import { useContext } from "react";
import { categoriesContext } from "../context/categoriesProvider";

export default function useCategories() {
  return useContext(categoriesContext);
}