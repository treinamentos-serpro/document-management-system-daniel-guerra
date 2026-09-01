import { getDownloadUrl } from '../services/documentsService';

// Link de download direto para o documento (navegador trata o download nativo).
export default function DownloadButton({ documentId }) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      href={getDownloadUrl(documentId)}
      download
    >
      Baixar
    </a>
  );
}
