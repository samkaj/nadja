const Login = () => {
  const authorize = () => {
    const url = "https://accounts.spotify.com/authorize";
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const responseType = "code";
    const redirectUri = "http://localhost:3000/callback";
    const scope = "playlist-modify-public%20user-top-read%20user-read-private";
    const state = process.env.REACT_APP_SPOTIFY_STATE;
    window.location.href = `${url}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  };

  return <button onClick={authorize}>Login</button>;
};

export default Login;