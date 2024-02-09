import { useContext } from "react";
import { userContext } from "../context/userProvider";

export default function useUser() {
  return useContext(userContext);
}