import multer from "multer"
import { storage } from "./cloudinary.js"

export const uploader = multer({storage:storage});
