const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, "public/uploads/users");
    } else if (file.fieldname === "eventImage") {
      cb(null, "public/uploads/events/images");
    } else if (file.fieldname === "eventDocument") {
      cb(null, "pulic/uploads/events/documents");
    } else {
      cb(null, "public/uploads/others");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const imageMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  const documentMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (file.fieldname === "profileImage" || file.fieldname === "eventImage") {
    if (imageMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  } else if (file.fieldname === "eventDocument") {
    if (documentMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only document files are allowed"), false);
    }
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
