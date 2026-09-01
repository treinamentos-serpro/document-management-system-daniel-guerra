// Configuração central da aplicação via variáveis de ambiente (12-Factor App).
const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,
  STORAGE_DIR: process.env.STORAGE_DIR || path.join(__dirname, '..', 'storage'),
  MAX_UPLOAD_SIZE_BYTES: Number(process.env.MAX_UPLOAD_SIZE_BYTES) || 10 * 1024 * 1024,
};
