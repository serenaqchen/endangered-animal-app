import express from "express";

import * as db from "./db.mjs";

const sightingRouter = express.Router();

sightingRouter.get("/", async (request, response) => {
  const sightings = await db.getSightings();
  response.json(sightings);
});

// sightingRouter.use(express.json());
// sightingRouter.post("/", async (request, response) => {
//   const sighting = await db.addSighting(request.body.name);
//   response.status(201).json(sighting);
// });

export default sightingRouter;
