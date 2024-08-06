import express from "express";
import authRoute from "./routes/auth.routes.js";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

configDotenv(); //To use env variables
app.use(express.json({ limit: "1KB" })); //Use req.body in functions
app.use(cookieParser()); //For using cookies

//Session middleware configuration
app.use(
  session({
    name: "AuthCookie",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false, // Set to true if using HTTPS
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
    },
  })
);

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("What are you trying to see???!!!");
});

//Starthing the server
app.listen(process.env.PORT, () => {
  connectToMongoDB(); //Connection being established
  console.log(`Running on http://localhost:${process.env.PORT}`);
});
