import { ReactNode, createContext, useEffect, useState } from "react";
import { Buffer } from "buffer";
import useLocalStorage from "../hooks/PersistState";

export type User = {
  accessToken: string;
  refreshToken: string;
  name: string;
  sessionExpiresAt: number;
  imageUrl: string;
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
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("user");

  useEffect(() => {
    const userFromStorage = getLocalStorage();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLocalStorage(user);
    } else {
      removeLocalStorage();
    }
  }, [user]);

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
      const { name, imageUrl } = await getUserInfo(data.access_token);
      const user: User = data.error
        ? null
        : {
            name: name,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            sessionExpiresAt: Date.now() + data.expires_in * 1000,
            imageUrl: imageUrl,
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
    const { name, imageUrl } = await getUserInfo(data.access_token);
    const user: User = data.error
      ? null
      : {
          name: name,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          sessionExpiresAt: Date.now() + data.expires_in * 1000,
          imageUrl: imageUrl,
        };
    return user;
  });
};

export const getUserInfo = async (
  accessToken: string
): Promise<{ name: string; imageUrl: string }> => {
  if (!accessToken) return { name: "Unknown", imageUrl: "" };
  const url = "https://api.spotify.com/v1/me";
  const headers = { Authorization: "Bearer " + accessToken };

  const response = await fetch(url, { headers });
  return response.json().then((data) => {
    return {
      name: data.display_name,
      imageUrl: data.images[0].url ?? "",
    };
  });
};

export const authorize = () => {
  const url = "https://accounts.spotify.com/authorize";
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const responseType = "code";
  const redirectUri = "http://localhost:3000/callback";
  const scope = "playlist-modify-public%20user-top-read%20user-read-private";
  const state = process.env.REACT_APP_SPOTIFY_STATE;
  window.location.href = `${url}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
};

export { UserContext, UserContextProvider };
