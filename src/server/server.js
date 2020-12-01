import express from "express";
import bodyParser from "body-parser";
import { router as xkcdService } from "./services/xkcd.js";

// Example app to understand the MERN stack
/*
    App can walk you through the XKCD comics and save the
    best ones for you in a database.
*/

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/xkcd", xkcdService);

app.listen(port, () => console.log(`Listening on port ${port}`));
