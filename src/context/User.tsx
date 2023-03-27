import { ReactNode, createContext, useEffect, useState } from "react";

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
  const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false);

  useEffect(() => {
    const checkAccessTokenExpiration = () => {
      if (!user) {
        setIsAccessTokenExpired(true);
        return;
      }

      const isExpired = user.sessionExpiresAt < Date.now() / 1000;
      setIsAccessTokenExpired(isExpired);
    };

    checkAccessTokenExpiration();
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
