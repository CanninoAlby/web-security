import { Request, Response, NextFunction } from 'express';
import { upload } from '../middlewares/GalleryMiddleware';

export const Upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Call the upload function from GalleryMiddleware to upload the single file
        upload.single('img')(req, res, (error: any) => {
            if (error) {
                // Error occurred during file upload
                return res.status(500).json({ error: 'Image size must be under 4mb' });
            }
            // File uploaded successfully
            next();
        });
    } catch (error) {
        // Error occurred during file upload
        res.status(500).json({ error: 'Error uploading file' });
    }
};

export default Upload;
