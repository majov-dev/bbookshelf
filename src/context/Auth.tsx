import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UsersContext } from "./Users";
import { UserContext } from "./User";

interface IAuth {
  signed: boolean;
  signin: (login: IUserLogin) => boolean;
  signup: (
    name: string,
    login: IUserLogin
  ) => { success: boolean; message: string };
  signout: () => void;
}

export const AuthContext = createContext<IAuth>({
  signed: false,
  signin: function (): boolean {
    throw new Error("Function not implemented.");
  },
  signup: function (): { success: boolean; message: string } {
    throw new Error("Function not implemented.");
  },
  signout: function (): void {
    throw new Error("Function not implemented.");
  },
});

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const { users, setUsers } = useContext(UsersContext);
  const { user, setUser } = useContext(UserContext);

  const signin = (login: IUserLogin) => {
    const user = users.find((user) => user?.login.email === login.email);

    if (user) {
      if (user.login.password === login.password) {
        setUser(user);
        return true;
      }
    }
    return false;
  };

  const signup = (name: string, login: IUserLogin) => {
    try {
      const id = uuidv4();

      const newUser: IUser = {
        id,
        name,
        login,
        favorites: { books: [], bookIds: [] },
        keepReading: { books: [], reading: [] },
      };

      const findUser = users?.find((user) => user?.login.email === login.email);

      if (findUser) {
        throw Error("A user with this email already exists.");
      } else {
        setUsers([...users, newUser]);
      }
      return {
        success: true,
        message:
          "User registered successfully! Log in using the provided email and password.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  //   const excluir = (email, password) => {
  //     if (acessar(email, password)) {
  //       const usuariosAtualizados = usuarios.filter(
  //         (usuario) => usuario.email !== email
  //       );
  //       setUsers(usuariosAtualizados);

  //       return true;
  //     }

  //     return false;
  //   };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
