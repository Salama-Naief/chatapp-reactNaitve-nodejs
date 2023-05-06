import UnauthenticatedError from "../errors/unauthenticated.error.js";
import NotFoundError from "../errors/not-found.error.js";
import BadRequestError from "../errors/bad-request.error.js";
import userModal from "../models/user.modal.js";
import uploadImages from "../utils/upload-images.js";

//get my profile
export const getMe = async (req, res) => {
  console.log("req", req.user);
  if (req.user) {
    const user = await userModal.findOne({ _id: req.user?.userId });
    if (!user) {
      throw new NotFoundError(`user not found with id ${req.user?.userId}`);
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } else {
    throw new UnauthenticatedError(`not authentecated!`);
  }
};

//get user profile by id
export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userModal.findById(id);
  if (!user) {
    throw new BadRequestError(`no user found with id =${id} `);
  }
  const { password, ...others } = user._doc;
  res.status(200).json(others);
};

//update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await userModal.findById(req.user.userId);

  console.log("files", req.files);
  console.log("body", req.body);

  let avatarImage = "";
  let coverImage = "";

  if (!user) {
    throw new BadRequestError(`user not found whit id=${id}`);
  }
  if (id.toString() !== req.user.userId.toString()) {
    throw new BadRequestError("you can update only your account");
  }
  //upload images
  if (req.files) {
    if (req.files.cover) {
      coverImage = await uploadImages(req.files.cover);
    }
    if (req.files.avatar) {
      avatarImage = await uploadImages(req.files.avatar);
    }
  }
  const userUpdated = await userModal.findByIdAndUpdate(
    req.user.userId,
    {
      ...req.body,
      ...(avatarImage && { avatar: avatarImage }),
      ...(coverImage && { cover: coverImage }),
    },
    { runValidators: true, new: true }
  );

  const { password, ...others } = userUpdated._doc;
  res.status(200).json(others);
};

//delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userModal.findById(id);

  if (!user) {
    throw new BadRequestError(`user not found whit id=${id}`);
  }
  if (id.toString() !== req.user.userId.toString()) {
    throw new BadRequestError("you can dalete only your account");
  }
  await userModal.findByIdAndDelete(id);

  res.status(200).json({ message: "user is deleted" });
};

//get users by seacrch
export const getUsers = async (req, res) => {
  const search = req.query.search;
  const seacrchQuery = search
    ? {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModal.find(seacrchQuery).find({
    _id: { $ne: req.user.userId },
  });

  res.status(200).json({ result: users.length, users });
};
