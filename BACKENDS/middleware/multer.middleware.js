import multer from "multer";
//when i call this like multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  },
});
//we call upload function it will call storage then store in ../public
const upload = multer({ storage: storage });

export default upload;
