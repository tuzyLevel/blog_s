import { Request } from "express";
import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { v4 } from "uuid";

dotenv.config();

const s3Config = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

const bucket = process.env.AWS_BUCKET_NAME!;

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req: Request, file, cb) {
      // /api/admin/posting/upload/:category

      cb(null, `/posting/images/${Date.now()}_${v4()}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
