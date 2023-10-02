import { useContext } from "react";
import { LibaryContext } from "../context/Libary";

export function useLibary() {
  const context = useContext(LibaryContext);
  if (!context) {
    throw new Error("useLibary should be used within a UserProvider.");
  }
  return context;
}
