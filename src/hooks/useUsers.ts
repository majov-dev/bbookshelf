import { useContext } from "react";
import { UsersContext } from "../context/Users";

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers should be used within a UserProvider.");
  }
  return context;
}
