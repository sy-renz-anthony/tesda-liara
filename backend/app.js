import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';
import { dbConnection } from './config/db.js';

const secretPath =
  fs.existsSync('/etc/secrets/.env')
    ? '/etc/secrets/.env'
    : `${process.cwd()}/.env`

dotenvConfig({ path: secretPath });

const app=express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://tesda-liara.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

import staffRouter from './routers/staff.router.js';
import userInputRouter from './routers/userInput.router.js';
import filesRouter from './routers/files.router.js';

app.use("/api/staff",staffRouter);
app.use("/api/user-input", userInputRouter);
app.use("/api/files", filesRouter);

app.get("/", (req, res)=>{
    res.json({message: "Server is working!"})
});

app.listen(PORT, ()=>{
    dbConnection();
    console.log("server started at http://localhost:"+PORT);
});