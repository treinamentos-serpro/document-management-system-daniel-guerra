import { getDownloadUrl } from '../services/documentsService';

// Link de download direto para o documento (navegador trata o download nativo).
export default function DownloadButton({ documentId }) {
  return (
    <a href={getDownloadUrl(documentId)} download>
      Baixar
    </a>
  );
}
