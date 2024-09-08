import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
