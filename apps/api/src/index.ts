import express from "express";

import { auth, toNodeHandler } from "@acme/auth";

import { env } from "./env";

const app = express();

app.all("/api/auth/*", toNodeHandler(auth));

app.get("/api/health", (req, res) => {
  res.send("ok");
});

app.listen(env.API_PORT, () => {
  console.log(`API listening on port ${env.API_PORT}`);
});
