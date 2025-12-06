import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: String,
    userType: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
 