import express from "express";
import axios from "axios";

export const callbackRouter = express.Router();

callbackRouter.get("/callback", (req, res) => {
  if (req.query.state === null) {
    res.status(400).send("State does not match");
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: req.query.code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    };

    axios
      .post(authOptions.url, authOptions.form, {
        headers: authOptions.headers,
      })
      .then((response) => {
        if (response.status === 200) {
          res.status(200).send({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            scope: response.data.scope,
            expires_in: response.data.expires_in,
          });
        }
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data);
      });
  }
});
