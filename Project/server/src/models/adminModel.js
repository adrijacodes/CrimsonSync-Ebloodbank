import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKENEXPIRY, TOKENSECRETKEY } from "../../envAccess.js";
const adminSchema = new mongoose.Schema(
  {
    name: {
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
    role: { type: String, default: "admin" },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [8, "minimum size of 6 is required"],
      maxlength: [60, "User password exceeded(max-60)"],
    },
  },
  { timestamps: true }
);
adminSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.passwordValidityCheck = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
adminSchema.methods.generateUserAccessToken = async function () {
  const token = jwt.sign(
    {
      email: this.email,
    },
    TOKENSECRETKEY,
    { expiresIn: TOKENEXPIRY }
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
