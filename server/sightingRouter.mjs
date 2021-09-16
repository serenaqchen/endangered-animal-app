import express from "express";

import * as db from "./db.mjs";

const sightingRouter = express.Router();

sightingRouter.get("/", async (request, response) => {
  const sightings = await db.getSightings();
  response.json(sightings);
});

sightingRouter.use(express.json());
//posting that data that frontend send to backend 
sightingRouter.post("/", async (request, response) => {
  const newSighting = await db.addSighting(request.body);
  console.log(request.body)
  response.status(201).json(newSighting);
});

export default sightingRouter;
