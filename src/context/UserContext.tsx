import { createContext } from "react";
import { UserType } from "../UserTypes";

type UserContextType = {
  user: UserType | null;
  login: (userInfo: UserType) => void;
  logout: () => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);
