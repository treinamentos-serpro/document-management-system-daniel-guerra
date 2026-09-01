const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const service = require('../src/services/documents.service');

function createTempStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dms-storage-'));
}

function fakeUploadedFile(storedFileName, overrides = {}) {
  return {
    originalname: 'relatorio.pdf',
    filename: storedFileName,
    size: 1024,
    mimetype: 'application/pdf',
    ...overrides,
  };
}

test('registerUpload cria metadados completos a partir do arquivo enviado', () => {
  const file = fakeUploadedFile('stored-1.pdf');
  const document = service.registerUpload(file, 'daniel');

  assert.ok(document.id, 'deve gerar um id');
  assert.strictEqual(document.originalName, 'relatorio.pdf');
  assert.strictEqual(document.storedFileName, 'stored-1.pdf');
  assert.strictEqual(document.size, 1024);
  assert.strictEqual(document.mimeType, 'application/pdf');
  assert.strictEqual(document.owner, 'daniel');
  assert.ok(!Number.isNaN(Date.parse(document.uploadedAt)), 'uploadedAt deve ser uma data válida');
});

test('registerUpload define owner como null quando não informado', () => {
  const file = fakeUploadedFile('stored-2.pdf');
  const document = service.registerUpload(file, undefined);

  assert.strictEqual(document.owner, null);
});

test('listDocuments filtra pelo owner informado', () => {
  service.registerUpload(fakeUploadedFile('stored-3.pdf'), 'owner-filtro-a');
  service.registerUpload(fakeUploadedFile('stored-4.pdf'), 'owner-filtro-b');

  const documents = service.listDocuments({ owner: 'owner-filtro-a' });

  assert.ok(documents.length > 0);
  assert.ok(documents.every((doc) => doc.owner === 'owner-filtro-a'));
});

test('listDocuments sem filtro retorna todos os documentos cadastrados', () => {
  const before = service.listDocuments().length;
  service.registerUpload(fakeUploadedFile('stored-5.pdf'), 'owner-qualquer');

  const documents = service.listDocuments();

  assert.strictEqual(documents.length, before + 1);
});

test('getDownloadInfo retorna o documento e o caminho do arquivo quando ele existe no disco', () => {
  const storageDir = createTempStorageDir();
  const storedFileName = 'stored-6.pdf';
  fs.writeFileSync(path.join(storageDir, storedFileName), 'conteúdo do arquivo');

  const document = service.registerUpload(fakeUploadedFile(storedFileName), 'daniel');
  const info = service.getDownloadInfo(document.id, storageDir);

  assert.ok(info);
  assert.strictEqual(info.document.id, document.id);
  assert.strictEqual(info.filePath, path.join(storageDir, storedFileName));
});

test('getDownloadInfo retorna null quando o id não existe', () => {
  const storageDir = createTempStorageDir();

  const info = service.getDownloadInfo('id-inexistente', storageDir);

  assert.strictEqual(info, null);
});

test('getDownloadInfo retorna null quando o arquivo não existe mais no disco', () => {
  const storageDir = createTempStorageDir();
  const document = service.registerUpload(fakeUploadedFile('stored-nao-existe.pdf'), 'daniel');

  const info = service.getDownloadInfo(document.id, storageDir);

  assert.strictEqual(info, null);
});
