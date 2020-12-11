import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes';
import taskRoutes from './routes/task.routes';
import eventRegistrationRoutes from './routes/eventRegistration.routes';
import taskRegistrationRoutes from './routes/taskRegistration.routes';
import connect from './connect';
import bodyParser from 'body-parser';

const app: Express = express();

const port: string | number = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/tasks', taskRoutes);
app.use('/eventregistrations', eventRegistrationRoutes);
app.use('/taskregistrations', taskRegistrationRoutes);

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to the unicef app')
);

app.listen(port, () =>
  console.log(`Application started successfully on port ${port}.`)
);

//change it to your local mongodb server
const db = 'mongodb+srv://dba:uSw0yoB02b65GxHC@cluster0.n48sc.mongodb.net/test?retryWrites=true&w=majority&replicaSet=rs';

connect({db});