// Rotas de documentos: define os endpoints e delega para os controllers.
const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const controller = require('../controllers/documents.controller');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');
const MAX_UPLOAD_SIZE_BYTES = Number(process.env.MAX_UPLOAD_SIZE_BYTES) || 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: STORAGE_DIR,
  filename: (req, file, cb) => {
    const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, limits: { fileSize: MAX_UPLOAD_SIZE_BYTES } });

const router = express.Router();

router.post('/upload', upload.single('file'), controller.upload);
router.get('/documents', controller.list);
router.get('/documents/:id/download', controller.download);

module.exports = router;
