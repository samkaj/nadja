import { useContext, useEffect, useState } from "react";
import { UserContext, User, getUserName } from "../context/User";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";

const nullUser: User = {
  name: "Unknown",
  accessToken: "",
  refreshToken: "",
  sessionExpiresAt: 0,
};

const Callback = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      onLoad();
    }
  }, []);

  const onLoad = () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code && !user) {
      loginUser(code);
    }
  };

  // TODO: Move to UserContext
  const loginUser = async (code: string) => {
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

    response.json().then(async (data) => {
      const user: User = data.error
        ? nullUser
        : {
            name: await getUserName(data.access_token),
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            sessionExpiresAt: Date.now() + data.expires_in * 1000,
          };
      setUser(user);
    });
    setLoading(false);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && <Navigate to="/" />}
    </>
  );
};

export default Callback;
