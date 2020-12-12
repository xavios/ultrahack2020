require("dotenv").config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import eventRoutes from "./routes/event.routes";
import taskRoutes from "./routes/task.routes";
import eventRegistrationRoutes from "./routes/eventRegistration.routes";
import taskRegistrationRoutes from "./routes/taskRegistration.routes";
import connect from "./connect";
import bodyParser from "body-parser";
import path from "path";
import { VerifyToken } from "./middlewares/authjwt";

const app: Express = express();

let port: string | number = process.env.REACT_APP_BACKEND_PORT;

if (process.env.NODE_ENV === "production") {
  // In prod the PORT means the Heroku port,
  // while in Dev CRA it menas the frontend port...
  port = process.env.PORT;
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use("/users", userRoutes);
app.use("/events", [VerifyToken, eventRoutes]);
app.use("/tasks", [VerifyToken, taskRoutes]);
app.use("/eventregistrations", [VerifyToken, eventRegistrationRoutes]);
app.use("/taskregistrations", [VerifyToken, taskRegistrationRoutes]);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", function (req, resp) {
  resp.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to the unicef app")
);

app.listen(port, () =>
  console.log(`Application started successfully on port ${port}.`)
);

const db = process.env.MONGO_CONNECTION_STRING;

connect({ db });
