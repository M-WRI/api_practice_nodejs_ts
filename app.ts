require("dotenv").config();

import express from "express";
import { connectDB } from "./src/mongoConfig";
import userRoute from "./src/routes/user";
import profileRoute from "./src/routes/profile";
import testRoute from "./src/routes/testRoutes";

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8001;

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
// Test Route
app.use("/api/test", testRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
