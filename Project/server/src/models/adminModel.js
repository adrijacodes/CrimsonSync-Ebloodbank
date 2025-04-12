import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKENEXPIRY, TOKENSECRETKEY } from "../../envAccess.js";
const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: { type: String, default: "admin" },
    password: {
      type: String,
      required: true,
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
