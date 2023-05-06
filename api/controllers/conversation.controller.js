import conversationModal from "../models/conversation.modal.js";
import BadRequestError from "../errors/bad-request.error.js";
import userModal from "../models/user.modal.js";
import NotFoundError from "../errors/not-found.error.js";
import uploadImages from "../utils/upload-images.js";

//@description  create one to one chat
//@route        POST /api/conversation
//Access        protected
export const createConversation = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    throw new BadRequestError("reciver user must be entered");
  }
  let isChat = await conversationModal
    .find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.userId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat.length > 0) {
    return res.status(200).json(isChat[0]);
  } else {
    const newCov = new conversationModal({
      users: [req.user.userId, userId],
    });

    const cov = await newCov.save();
    const conversation = await conversationModal
      .findById(cov._id)
      .populate("users", "-password")
      .populate("latestMessage");

    res.status(201).json(conversation);
  }
};

//@description  get conversations
//@route        GET /api/conversation
//Access        protected
export const getConversation = async (req, res) => {
  let covs = await conversationModal
    .find({
      users: { $elemMatch: { $eq: req.user.userId } },
    })
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  covs = await userModal.populate(covs, {
    path: "latestMessage.sender",
    select: "username avatar email",
  });
  res.status(200).json(covs);
};

//@description  create chat  group
//@route        POST /api/conversation/group
//Access        protected
export const createGroup = async (req, res) => {
  const { usersData, chatName } = req.body;
  const users = usersData ? JSON.parse(usersData) : [];
  console.log("usersData", usersData);
  console.log("req.files", req.files);
  if (users.length < 2) {
    throw new BadRequestError("group chat must contain more than 2 user");
  }

  if (!req.files || !req.files.image) {
    throw new BadRequestError("you must sellect group image");
  }
  const image = await uploadImages(req.files.image);
  console.log("image", image);

  const newGroup = new conversationModal({
    chatName: chatName,
    isGroup: true,
    image: image,
    groupAdmins: [req.user.userId],
    users: [req.user.userId, ...users],
  });
  const savedGroup = await newGroup.save();
  res.status(201).json(savedGroup);
};

//@description  update chat  group
//@route        PATCH /api/conversation/group/:id
//Access        protected
export const updateGroup = async (req, res) => {
  const { userId, chatName, type } = req.body;
  const { id } = req.params;

  let updateUsers = {};
  const existGroup = await conversationModal.findById(id);
  console.log("existGroup", existGroup);

  if (!existGroup) {
    throw new NotFoundError(`group not found by id=${id}`);
  }
  if (!existGroup.groupAdmins.includes(req.user.userId)) {
    throw new BadRequestError(`you must be admin to update group`);
  }

  if (type) {
    if (existGroup.users.includes(userId)) {
      if (type === "remove") {
        updateUsers = { $pull: { users: userId } };
      } else {
        throw new BadRequestError(`this user is already in the group`);
      }
    } else {
      if (type === "add") {
        updateUsers = { $push: { users: userId } };
      } else {
        throw new BadRequestError(`this user is not  in the group`);
      }
    }
  }

  const group = await conversationModal
    .findByIdAndUpdate(
      id,
      {
        chatName,
        ...updateUsers,
      },
      { new: true, runValidators: true }
    )
    .populate("users", "-cover -kind -password")
    .populate("latestMessage");

  res.status(201).json(group);
};

//@description  remove chat  group
//@route        DELETE /api/conversation/group/:id
//Access        protected
export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  const existGroup = await conversationModal.findById(id);

  if (!existGroup) {
    throw new NotFoundError(`group not found by id=${id}`);
  }
  if (!existGroup.groupAdmins.includes(req.user.userId)) {
    throw new BadRequestError(`you must be admin to delete group`);
  }
  await conversationModal.findByIdAndDelete(id);

  res.status(201).json({ message: "group id deleted" });
};
