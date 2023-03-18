import express from "express";

export const loginRouter = express.Router();

loginRouter.get("/login", (_, res) => {
  const url = "https://accounts.spotify.com/authorize";
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const responseType = "code";
  const redirectUri = "http://localhost:3000/callback";
  const scope = "playlist-modify-public user-top-read user-read-private";
  const state = process.env.SPOTIFY_STATE;
  res.redirect(
    `${url}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
  );
});
