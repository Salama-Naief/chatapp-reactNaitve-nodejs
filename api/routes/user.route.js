import express from "express";
import {
  getMe,
  deleteUser,
  getUser,
  updateUser,
  getUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", getMe);
router.get("/", getUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
