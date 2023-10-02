import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UsersContext } from "./Users";

export const UserContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}>({ user: null, setUser: () => {} });

const Users = ({ children }: { children: React.ReactNode }) => {
  const { users, setUsers } = useContext(UsersContext);

  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      const others = users.filter(
        (user) => user.login.email !== user.login.email
      );
      setUsers([...others, user]);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const insert = (name: string, login: IUserLogin) => {
    try {
      const id = uuidv4();

      const newUser: IUser = {
        id,
        name,
        login,
        favorites: { books: [], bookIds: [] },
        keepReading: { books: [], reading: [] },
      };

      const existeUsuario = users?.find(
        (user) => user?.login.email === login.email
      );

      if (existeUsuario) {
        throw Error("Já existe um usuário para esse e-mail.");
      } else {
        setUsers([...users, newUser]);
      }
      return {
        success: true,
        message:
          "Usuário cadastrado com sucesso! Faço seu email usando o e-mail e senha cadastrados.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Users;
