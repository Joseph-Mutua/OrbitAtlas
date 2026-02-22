import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    } catch (err) {
      cb(err as Error, UPLOAD_DIR);
    }
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.bin';
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(glb|gltf|jpg|jpeg|png)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error('Invalid file type'));
  },
});

export const assetsRouter = Router();

assetsRouter.post('/', upload.single('asset'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ code: 'NO_FILE', message: 'No file uploaded' });
    return;
  }
  const url = `/uploads/${file.filename}`;
  res.status(201).json({
    id: path.basename(file.filename, path.extname(file.filename)),
    url,
    mimeType: file.mimetype,
    sizeBytes: file.size,
  });
});
