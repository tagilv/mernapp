import { v2 as cloudinary } from "cloudinary";

const imageUpload = async (req, res) => {
  console.log("req.file", req.file);

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "ryggskolan-images",
    });
    console.log("uploadResult>>", uploadResult);
    res.status(200).json({ msg: "image uploaded successfully" });
  } catch (error) {
    console.log("error uploading image", error);
  }
};

export { imageUpload };
