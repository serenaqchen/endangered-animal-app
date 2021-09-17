import express from "express";

import * as db from "./db.mjs";

const speciesRouter = express.Router();

speciesRouter.get("/", async (request, response) => {
  const speceis = await db.getSpecies();
  response.json(speceis);
});

// speciesRouter.use(express.json());
// //posting that data that frontend send to backend
// speciesRouter.post("/", async (request, response) => {
//   const newSighting = await db.addSighting(request.body);
//   response.status(201).json(newSighting);
// });

export default speciesRouter;
