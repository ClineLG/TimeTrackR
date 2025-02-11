import { createContext } from "react";

type UserContextType = {
  checkUser: () => string | undefined;
  login: (token: string) => void;
  logout: () => void;
};

const defaultContextValue: UserContextType = {
  checkUser: () => undefined,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);
