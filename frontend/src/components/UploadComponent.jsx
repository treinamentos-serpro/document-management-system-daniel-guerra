import { useState } from 'react';
import { uploadDocument } from '../services/documentsService';

// Formulário simples para envio de um documento.
export default function UploadComponent({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      setError('Selecione um arquivo antes de enviar');
      return;
    }

    setError(null);
    setIsUploading(true);
    try {
      const document = await uploadDocument(file, owner);
      setFile(null);
      onUploaded(document);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form className="rounded-lg border border-stone-200/80 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">Novo envio</p>
        <h2 className="mt-2 text-xl font-semibold text-stone-950">Enviar documento</h2>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Informe o dono e selecione um arquivo para registrar no sistema.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="owner">Dono do documento</label>
        <input
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
          id="owner"
          type="text"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          placeholder="ex.: daniel"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="file">Arquivo</label>
        <input
          className="block w-full cursor-pointer rounded-md border border-dashed border-stone-300 bg-stone-50 text-sm text-stone-600 outline-none transition file:mr-4 file:border-0 file:bg-stone-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:border-sky-500 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0] || null)}
        />
        {file && <p className="mt-2 text-xs font-medium text-stone-500">Selecionado: {file.name}</p>}
      </div>
      </div>

      <button
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
        type="submit"
        disabled={isUploading}
      >
        {isUploading ? 'Enviando...' : 'Enviar documento'}
      </button>
      {error && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
