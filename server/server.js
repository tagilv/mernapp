import express from "express";
import cors from "cors";
import router from "./routes/test.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import mongoose from "mongoose";

// Creates express app and stores in app constant
const app = express();

// Routes
// app.get("/", (req, res) => {
//   res.json({ mssg: "Welcome to the app" });
// });

// Listen for requests
// Put the port number in an env (environment variable) file
// . env is a package that loads environmewnt variables form an env file into the process.env global varibale]
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use("/api", router);

async function connectToMongoDb() {
  await mongoose.connect(process.env.DB);
  console.log("MongDB is running in port>>", port);
}
connectToMongoDb();
