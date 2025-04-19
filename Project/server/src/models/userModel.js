//@ts-nocheck
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKENEXPIRY, TOKENSECRETKEY } from "../../envAccess.js";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      minlength: [3, "length of email too short"],
      maxlength: [31, "User email exceeded(max-31)"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [8, "minimum size of 6 is required"],
      maxlength: [60, "User password exceeded(max-60)"],
    },
    bloodType: {
      type: String,
    },
    location: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    isDonor: { type: Boolean, default: false },
    isRecipient: {
      type: Boolean,
      default: true,
    },
    availability: {
      type: String,
      enum: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN", "NONE"],
      default: "NONE",
    },
    userBloodDonationHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BloodRequests",
      },
    ],
    role: {
      type: String,
      enum: ["recipient", "donor", "BOTH"],
      default: "recipient",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.passwordValidityCheck = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};
userSchema.methods.generateUserAccessToken = async function () {
  const token = jwt.sign(
    {
      email: this.email,
    },
    TOKENSECRETKEY,
    { expiresIn: TOKENEXPIRY }
  );

  return token;
};

const User = mongoose.model("Users", userSchema);
export default User;
