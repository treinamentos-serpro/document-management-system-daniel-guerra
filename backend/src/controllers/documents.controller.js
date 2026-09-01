// Controllers: tratam entrada/saída HTTP e validação básica dos endpoints de documentos.
const path = require('path');
const service = require('../services/documents.service');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

function upload(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
  }

  const document = service.registerUpload(req.file, req.body.owner);
  return res.status(201).json(document);
}

function list(req, res) {
  const { owner } = req.query;
  const documents = service.listDocuments({ owner });
  return res.status(200).json(documents);
}

function download(req, res) {
  const info = service.getDownloadInfo(req.params.id, STORAGE_DIR);
  if (!info) {
    return res.status(404).json({ error: 'Documento não encontrado' });
  }

  return res.download(info.filePath, info.document.originalName);
}

module.exports = {
  upload,
  list,
  download,
};
