import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import { callbackRouter } from "./routes/callback";
import { loginRouter } from "./routes/login";
import { refreshRouter } from "./routes/refresh";

export const router = express.Router();
app.use(callbackRouter);
app.use(loginRouter);
app.use(refreshRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
