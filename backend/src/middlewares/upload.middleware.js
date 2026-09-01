// Middleware de upload: configura o multer com diskStorage, limite de tamanho e
// allowlist de MIME types aceitos.
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { STORAGE_DIR, MAX_UPLOAD_SIZE_BYTES } = require('../config');

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]);

const storage = multer.diskStorage({
  destination: STORAGE_DIR,
  filename: (_req, file, cb) => {
    cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);
  },
});

function fileFilter(_req, file, cb) {
  if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
    error.message = 'Tipo de arquivo não permitido';
    cb(error, false);
  }
}

module.exports = multer({ storage, limits: { fileSize: MAX_UPLOAD_SIZE_BYTES }, fileFilter });
