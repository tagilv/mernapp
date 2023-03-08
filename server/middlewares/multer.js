import multer, { diskStorage } from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("file not supported"), false);
      return;
    }
    // To accept the file pass `true`
    cb(null, true);
  },
});

export default upload;
