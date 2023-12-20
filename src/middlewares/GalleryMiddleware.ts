import multer from 'multer';
import path from 'path';

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img'); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename files to prevent collisions
  },
});
export const upload = multer({ storage,limits: { fileSize: 4000000 /* bytes */ } });
