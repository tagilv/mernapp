import express from "express";
import cors from "cors";
import router from "./routes/test.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import weeksRoutes from "./routes/weeksRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import cloudinaryConfig from "./config/cloudinary.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import commentModel from "./model/commentsModel.js";

dotenv.config();

const app = express();

// Listen for requests:
const port = process.env.PORT || 5002;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ryggskolan.vercel.app",
  // credentials: true,
  // From the front end, this url can fetch dat for me
  // origin: "https://mernapp-azfy.vercel.app",
  // credentials: true,
};

const addMiddleWares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  // const corsOptions = {
  //   // origin: "http://localhost:3000",
  //   // credentials: true,
  //   // From the front end
  //   origin: "https://mernapp-azfy.vercel.app",
  //   credentials: true,
  // };
  // corsOptions removed
  app.use(cors(corsOptions));

  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/weeks", weeksRoutes);
  app.use("/api/exercises", exercisesRoutes);
  app.use("/api/comments", commentsRoutes);
  app.use("/api/users", usersRoutes);
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("MongDB is running in port>>", port);
  } catch (error) {
    console.log("error", error);
  }
};

(async function controller() {
  await mongoDBConnection();
  addMiddleWares();
  loadRoutes();
  startServer();
})();
