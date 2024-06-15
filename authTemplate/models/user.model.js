import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      minlength: 5,
    },
    userName: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    profilePic: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: null,
      enum: ["Male", "Female"],
    },
    bio: {
      type: String,
      default: "",
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedAccount: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: String,
      default: "Member",
      enum: ["Member", "Pro"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
