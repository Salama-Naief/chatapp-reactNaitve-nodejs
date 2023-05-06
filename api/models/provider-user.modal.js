import { Schema } from "mongoose";
import userModal from "./user.modal.js";

const providerUserSchema = new Schema({
  providerId: {
    type: String,
    required: true,
  },
});

export default userModal.discriminator("providerUser", providerUserSchema);
