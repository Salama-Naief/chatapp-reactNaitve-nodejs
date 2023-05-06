import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    chatName: { type: String, trim: true, default: "" },
    isGroup: { type: Boolean, default: false },
    image: { type: String, default: "" },
    latestMessage: { type: Schema.Types.ObjectId, ref: "Messages" },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    groupAdmins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("Conversation", conversationSchema);
