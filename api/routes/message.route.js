import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.route("/").post(createMessage);
router.route("/:conversationId").get(getMessages);
router.route("/:id").delete(deleteMessage);

export default router;
