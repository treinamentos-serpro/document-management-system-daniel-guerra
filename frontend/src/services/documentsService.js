// Serviço de comunicação com a API do backend (prefixo /api via proxy do Vite).
const API_BASE = '/api';

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  if (owner) {
    formData.append('owner', owner);
  }

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Falha ao enviar o documento');
  }

  return response.json();
}

export async function listDocuments(owner) {
  const query = owner ? `?owner=${encodeURIComponent(owner)}` : '';
  const response = await fetch(`${API_BASE}/documents${query}`);

  if (!response.ok) {
    throw new Error('Falha ao listar os documentos');
  }

  return response.json();
}

export function getDownloadUrl(id) {
  return `${API_BASE}/documents/${id}/download`;
}
