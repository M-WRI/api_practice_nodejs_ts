require("dotenv").config();

import express from "express";
import { connectDB } from "./src/mongoConfig";
import userRoute from "./src/routes/user";

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8001;

app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
