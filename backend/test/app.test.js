const { test } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

test('o app backend é exportado', () => {
  assert.ok(app, 'o app deve estar definido');
  assert.strictEqual(typeof app, 'function', 'o app Express deve ser uma função');
});

async function withServer(callback) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  try {
    await callback(`http://localhost:${port}`);
  } finally {
    server.close();
  }
}

test('POST /upload sem arquivo retorna 400', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/upload`, { method: 'POST' });
    assert.strictEqual(response.status, 400);
  });
});

test('POST /upload, GET /documents e GET /documents/:id/download funcionam de ponta a ponta', async () => {
  await withServer(async (baseUrl) => {
    const formData = new FormData();
    formData.append('file', new Blob(['conteúdo de teste']), 'teste.txt');
    formData.append('owner', 'daniel');

    const uploadResponse = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });
    assert.strictEqual(uploadResponse.status, 201);
    const document = await uploadResponse.json();
    assert.strictEqual(document.originalName, 'teste.txt');
    assert.strictEqual(document.owner, 'daniel');

    const listResponse = await fetch(`${baseUrl}/documents?owner=daniel`);
    assert.strictEqual(listResponse.status, 200);
    const documents = await listResponse.json();
    assert.ok(documents.some((doc) => doc.id === document.id));

    const downloadResponse = await fetch(`${baseUrl}/documents/${document.id}/download`);
    assert.strictEqual(downloadResponse.status, 200);
    const content = await downloadResponse.text();
    assert.strictEqual(content, 'conteúdo de teste');
  });
});

test('GET /documents/:id/download com id inexistente retorna 404', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/documents/id-inexistente/download`);
    assert.strictEqual(response.status, 404);
  });
});
