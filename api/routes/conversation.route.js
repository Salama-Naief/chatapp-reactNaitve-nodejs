import express from "express";
import {
  createConversation,
  getConversation,
  createGroup,
  deleteGroup,
  updateGroup,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.route("/").post(createConversation).get(getConversation);
router.route("/group").post(createGroup);
router.route("/group/:id").patch(updateGroup).delete(deleteGroup);

export default router;
