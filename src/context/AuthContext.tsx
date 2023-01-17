import React, { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onLoginStateChange } from "../apis/firebase";
import { IUser } from "../types/userVo";

interface IContextProps {
  user?: IUser;
  uid?: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<IContextProps>({
  user: undefined,
  uid: undefined,
  login,
  logout,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>(
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );

  useEffect(() => {
    onLoginStateChange((user: IUser) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
