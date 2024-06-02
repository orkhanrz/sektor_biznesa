const path = require("path");
const multer = require("multer");
const uploadPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + ext);
	},
});

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = fileTypes.test(file.mimetype);
  
	if (mimetype && extname) {
	  return cb(null, true);
	} else {
	  cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	}
  };

module.exports = multer({ storage, fileFilter, limits: { fileSize: 1e7 } });
