import fs from "fs";
import cloudinary from "cloudinary";
import BadRequestError from "../errors/bad-request.error.js";
const uploadFiles = async (file, type) => {
  //check the files is single file or multifiles
  if (file.length) {
    const files = [];
    for (const image of file) {
      {
        const url = await cloudinary.v2.uploader.upload(image.tempFilePath, {
          use_filename: true,
          resource_type: type,
          folder: "chatapp",
        });
        fs.unlinkSync(image.tempFilePath);
        files.push(url.secure_url);
      }
    }
    return files;
  } else {
    //check the type of image
    const url = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      use_filename: true,
      resource_type: type,
      folder: "chatapp",
    });
    fs.unlinkSync(file.tempFilePath);
    return url.secure_url;
  }
};

export default uploadFiles;
