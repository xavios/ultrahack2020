// import { XKCD } from "./../repositories/xkcd";
import express from "express";
import { XKCD as repository } from "./../repositories/xkcd.js";

export const router = express.Router();

// curl http://localhost:3000/xkcd/latest
router.get("/latest", async (req, resp) => {
  const rep = new repository();
  let comicData = await rep.GetLatestComicMetadata();
  resp.header("Content-Type", "application/json");
  resp.send(JSON.stringify(comicData, null, 4));
});

// curl -d '{"id": "2000" }' -H 'Content-Type: application/json' http://localhost:3000/xkcd/
router.post("/", async (req, resp) => {
  const id = req.body.id;
  const rep = new repository();
  let specificComic = await rep.GetSpecificComic(id);
  resp.header("Content-Type", "application/json");
  resp.send(JSON.stringify(specificComic, null, 4));
});
