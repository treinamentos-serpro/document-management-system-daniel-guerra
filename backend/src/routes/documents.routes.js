// Rotas de documentos: define os endpoints e delega para os controllers.
const express = require('express');
const uploadMiddleware = require('../middlewares/upload.middleware');
const controller = require('../controllers/documents.controller');

const router = express.Router();

router.post('/upload', uploadMiddleware.single('file'), controller.upload);
router.get('/documents', controller.list);
router.get('/documents/:id/download', controller.download);

module.exports = router;
