import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import userModal from "./user.modal.js";

const localUserSchema = new Schema({
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
});

localUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

localUserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default userModal.discriminator("localUser", localUserSchema);
