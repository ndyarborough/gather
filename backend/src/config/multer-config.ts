import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + extname(file.originalname));
    },
  }),
  //  fileFilter: (req, file, callback) => {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // Accept only image files
  //     return callback(new Error('Only image files are allowed'), false);
  //   }
  //   callback(null, true);
  // },
};