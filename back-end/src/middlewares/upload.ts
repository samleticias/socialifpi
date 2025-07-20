import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';
import { randomUUID } from 'crypto'; // Opcional para nome único

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, path.resolve(__dirname, '../../uploads'));
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

export const upload = multer({ storage });
