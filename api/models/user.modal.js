import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    phone: {
      type: Number,
      required: false,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      required: false,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dlttbpnxw/image/upload/v1682493957/chatapp/tmp-4-1682493955869_wm9udw.jpg",
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dlttbpnxw/image/upload/v1682493956/chatapp/tmp-3-1682493955868_swomrh.jpg",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: 3,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
  },

  { timestamps: true, discriminatorKey: "kind" }
);

export default mongoose.model("User", userSchema);
