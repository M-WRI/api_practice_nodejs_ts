require("dotenv").config();

import express from "express";
import { connectDB } from "./src/mongoConfig";
// Routes
import userRoute from "./src/routes/user";
import profileRoute from "./src/routes/profile";
import me from "./src/routes/me";
import testRoute from "./src/routes/testRoutes";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8001;

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/check", me);
// Test Route
app.use("/api/test", testRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
