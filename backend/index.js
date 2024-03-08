import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import ConnectedDB from './config/db.js';
import router from './router/adminRoutes.js';
import emprouter from './router/empRoutes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
ConnectedDB();

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send(`<h1>Api is working.....!</h1>`);
});

// middleware.........
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/Api/admin", router);
app.use("/Api/employee", emprouter);

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`.bgYellow.bold);
});