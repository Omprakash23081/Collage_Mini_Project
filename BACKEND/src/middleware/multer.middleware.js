import multer from "multer";
//when i call this like multer
// Use memory storage to process files (compress/resize) before saving
const storage = multer.memoryStorage();

//we call upload function it will call storage then store in buffer
const upload = multer({ storage: storage });

export default upload;
