// Rotas de documentos: define os endpoints e delega para os controllers.
const express = require('express');
const uploadMiddleware = require('../middlewares/upload.middleware');
const { createRateLimiter } = require('../middlewares/rate-limiter.middleware');
const controller = require('../controllers/documents.controller');

const uploadRateLimiter = createRateLimiter({ windowMs: 60_000, max: 20 });
const downloadRateLimiter = createRateLimiter({ windowMs: 60_000, max: 60 });

const router = express.Router();

router.post('/upload', uploadRateLimiter, uploadMiddleware.single('file'), controller.upload);
router.get('/documents', controller.list);
router.get('/documents/:id/download', downloadRateLimiter, controller.download);

module.exports = router;
