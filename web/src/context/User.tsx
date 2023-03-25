import { createContext, useState } from "react";

export type User = {
  accessToken: string;
  refreshToken: string;
  name: string;
  sessionExpiresAt: number;
} | null;

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
