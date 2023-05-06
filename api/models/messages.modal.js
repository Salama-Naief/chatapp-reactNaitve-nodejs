import { Schema, model } from "mongoose";

const messagesSchema = new Schema(
  {
    content: { type: String, trim: true, default: "" },
    media: [{ type: String, default: "" }],
    mediaType: { type: String, default: "image" },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Messages", messagesSchema);
