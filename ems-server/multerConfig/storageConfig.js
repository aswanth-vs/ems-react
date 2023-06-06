const multer = require("multer");

//using multer to define storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

//filtering uploaded files
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    // callback(new Error("Please upload an image!"), false);
    callback(null, false);
    return callback(new Error("Only .png, .jpg, .jpeg file are supported"));
  }
};

//define upload
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
