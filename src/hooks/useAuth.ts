import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used within a UserProvider.");
  }
  return context;
}
