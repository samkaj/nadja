import axios from "axios";
import express from "express";

export const refreshRouter = express.Router();

/**
 * Endpoint for refreshing an access token
 *
 * The request body must contain `refresh_token`
 */
refreshRouter.get("/refresh", (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      refresh_token: req.body.refresh_token,
      grant_type: "refresh_token",
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
      res.status(200).send({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        scope: response.data.scope,
        expires_in: response.data.expires_in,
      });
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
});
