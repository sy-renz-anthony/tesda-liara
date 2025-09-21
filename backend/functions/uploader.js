import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "./");
  },
  filename: (req, file, done) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    done(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, done) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    done(null, true);
  } else {
    done(new Error("JPEG, JPG and PNG files are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter
});
