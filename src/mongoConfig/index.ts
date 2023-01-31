import mongoose from "mongoose";

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!, options, (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.error(err);
  }
};
