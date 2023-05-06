import messagesModal from "../models/messages.modal.js";
import coversationModal from "../models/conversation.modal.js";
import uploadImages from "../utils/upload-images.js";
import uploadFiles from "../utils/upload-files.js";

//@desc   create new message
//@route  POST /api/messages
//access  protected
export const createMessage = async (req, res) => {
  let images = null;
  let videos = null;
  let audios = null;
  console.log("req files", req.files);
  if (req.files) {
    if (req.files.images) {
      images = await uploadImages(req.files.images);
    } else if (req.files.videos) {
      console.log("req videos", req.files.videos);
      videos = await uploadFiles(req.files.videos, "video");
    } else if (req.files.audios) {
      audios = await uploadFiles(req.files.audios, "video");
    }
  }
  console.log("videos", videos);
  console.log("audios", audios);
  console.log("images", images);
  const newMessage = new messagesModal({
    ...req.body,
    sender: req.user.userId,
    ...(images && { media: images, mediaType: "image" }),
    ...(audios && { media: audios, mediaType: "audio" }),
    ...(videos && { media: videos, mediaType: "video" }),
  });
  const savedMesage = await newMessage.save();

  const message = await messagesModal
    .findById(savedMesage._id)
    .populate("sender", "-cover -kind -password")
    .populate("readBy", "+username +_id")
    .populate("conversationId");
  await coversationModal.findByIdAndUpdate(req.body.conversationId, {
    latestMessage: message,
  });
  res.status(200).json(message);
};

//@desc   get all messages
//@route  GET /api/messages/:conversationId
//access  protected
export const getMessages = async (req, res) => {
  console.log("conversationId", req.params.conversationId);
  let messages = await messagesModal
    .find({ conversationId: req.params.conversationId })
    .populate("sender", "-cover -kind -password")
    .populate("readBy", "+username +_id")
    .populate("conversationId");

  res.status(200).json(messages);
};

//@desc   delete message
//@route  DELETE /api/messages/:id
//access  protected
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const message = await messagesModal.findById(id);
  if (!message) {
    throw new BadRequestError(`message wiht id=${id} is not found`);
  }
  await messagesModal.findByIdAndDelete(id);
  res.status(200).json({ message: "message id deleted" });
};
