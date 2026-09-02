// Servidor backend do Document Management System.
const express = require('express');
const multer = require('multer');
const documentsRoutes = require('./routes/documents.routes');
const { PORT } = require('./config');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(documentsRoutes);

// Middleware de erro: traduz falhas do multer (ex.: limite de tamanho, tipo inválido) em respostas HTTP.
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Arquivo excede o tamanho máximo permitido' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(415).json({ error: err.message || 'Tipo de arquivo não permitido' });
    }
  }

  if (err) {
    return res.status(400).json({ error: 'Não foi possível processar a requisição' });
  }

  return next();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`DMS backend ouvindo na porta ${PORT}`);
  });
}

module.exports = app;
