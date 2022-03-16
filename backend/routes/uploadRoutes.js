import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./frontend/public/images");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const checkFileType = (file, cb) => {
  const filetypes = /jpg|png|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("images only !!");
  }
};
const upload = multer({
  storage: storage,
});

router.post("/", upload.single("image"), (req, res) => {
  const path = req.file.path;
  const imagepath = `/${path.split("/")[2]}` + "/" + `${path.split("/")[3]}`;
  res.send(imagepath);
});

export default router;
