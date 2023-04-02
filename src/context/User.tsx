import { ReactNode, createContext, useEffect, useState } from "react";
import { Buffer } from "buffer";
import useLocalStorage from "../hooks/PersistState";

export type User = {
  accessToken: string;
  refreshToken: string;
  name: string;
  sessionExpiresAt: number;
} | null;

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  isAccessTokenExpired: boolean;
  refreshAccessToken: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isAccessTokenExpired: false,
  refreshAccessToken: async () => {},
});

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContextProvider = (props: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const [isAccessTokenExpired] = useState(false);
  const [getLocalStorage, setLocalStorage] = useLocalStorage("user");

  useEffect(() => {
    const userFromStorage = getLocalStorage();
    if (userFromStorage) {
      setUser(userFromStorage);
    } else if (user) {
      setLocalStorage(user);
    }
  }, [setUser]);

  const refreshAccessToken = async () => {
    const url = "https://accounts.spotify.com/api/token";
    const grantType = "refresh_token";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.REACT_APP_SPOTIFY_CLIENT_ID +
              ":" +
              process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=${grantType}&refresh_token=${user?.refreshToken}`,
    });

    response.json().then(async (data) => {
      const user: User = data.error
        ? null
        : {
            name: await getUserName(data.access_token),
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            sessionExpiresAt: Date.now() + data.expires_in * 1000,
          };
      setUser(user);
    });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isAccessTokenExpired, refreshAccessToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const loginUser = async (code: string): Promise<User> => {
  const url = "https://accounts.spotify.com/api/token";
  const redirectUri = "http://localhost:3000/callback";
  const grantType = "authorization_code";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=${grantType}&code=${code}&redirect_uri=${redirectUri}`,
  });

  return response.json().then(async (data) => {
    const user: User = data.error
      ? null
      : {
          name: await getUserName(data.access_token),
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          sessionExpiresAt: Date.now() + data.expires_in * 1000,
        };
    return user;
  });
};

export const getUserName = async (accessToken: string): Promise<string> => {
  if (!accessToken) return "Unknown";
  const url = "https://api.spotify.com/v1/me";
  const headers = { Authorization: "Bearer " + accessToken };

  return fetch(url, { method: "GET", headers })
    .then((response) => response.json())
    .then((data) => {
      return data.display_name;
    })
    .catch((error) => {
      console.error(error);
      return "Unknown";
    });
};

export { UserContext, UserContextProvider };
