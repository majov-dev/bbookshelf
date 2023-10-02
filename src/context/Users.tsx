import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UsersContext = createContext<{
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}>({ users: [], setUsers: () => {} });

const Users = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.removeItem("users");
    }
  }, [users]);

  return (
    <UsersContext.Provider value={{users, setUsers}}>{children}</UsersContext.Provider>
  );
};

export default Users;
