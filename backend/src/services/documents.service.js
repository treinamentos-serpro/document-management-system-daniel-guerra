// Regras de negócio para upload, listagem e download de documentos.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const repository = require('../repositories/documents.repository');

function registerUpload(file, owner) {
  const metadata = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    storedFileName: file.filename,
    size: file.size,
    mimeType: file.mimetype,
    uploadedAt: new Date().toISOString(),
    owner: owner || null,
  };

  return repository.create(metadata);
}

function listDocuments({ owner } = {}) {
  return repository.findAll({ owner });
}

function getDownloadInfo(id, storageDir) {
  const document = repository.findById(id);
  if (!document) {
    return null;
  }

  const filePath = path.join(storageDir, document.storedFileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return { document, filePath };
}

module.exports = {
  registerUpload,
  listDocuments,
  getDownloadInfo,
};
