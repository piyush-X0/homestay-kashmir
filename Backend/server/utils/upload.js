import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const filename = fileURLToPath(import.meta.url);
const dirname = dirname(filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ccb(null, 'server/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
export const upload = multer({ storage: storage });
