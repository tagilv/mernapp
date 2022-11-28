import express from "express";
import cors from "cors";
import router from "./routes/test.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import weeksRoutes from "./routes/weeksRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js";
dotenv.config();
// Creates express app and stores in app constant:
const app = express();

// Listen for requests:
const port = process.env.PORT || 5000;

const addMiddleWares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
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

// Need to add () / call at the end to have it auto invoke.
// Note: Now the fucntion names are not floating around in the global scope anymore
