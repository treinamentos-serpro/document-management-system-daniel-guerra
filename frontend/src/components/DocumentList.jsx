import DownloadButton from './DownloadButton';

// Lista os documentos enviados, com opção de download por item.
export default function DocumentList({ documents, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="px-5 py-8">
        <div className="animate-pulse space-y-3" aria-label="Carregando documentos">
          <div className="h-4 w-40 rounded bg-stone-200" />
          <div className="h-12 rounded-md bg-stone-100" />
          <div className="h-12 rounded-md bg-stone-100" />
          <div className="h-12 rounded-md bg-stone-100" />
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="px-5 py-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-amber-100 text-lg font-bold text-amber-700">
          0
        </div>
        <p className="mt-4 text-sm font-semibold text-stone-800">Nenhum documento enviado ainda.</p>
        <p className="mt-1 text-sm text-stone-500">Use o formulário ao lado para iniciar a lista.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
        <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
          <tr>
            <th className="px-5 py-3 font-semibold">Nome</th>
            <th className="px-5 py-3 font-semibold">Tamanho</th>
            <th className="px-5 py-3 font-semibold">Enviado em</th>
            <th className="px-5 py-3 font-semibold">Dono</th>
            <th className="px-5 py-3 font-semibold">Download</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 bg-white">
          {documents.map((document) => (
            <tr className="transition hover:bg-stone-50" key={document.id}>
              <td className="max-w-64 px-5 py-4 font-medium text-stone-950">
                <span className="block truncate" title={document.originalName}>{document.originalName}</span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-stone-600">{document.size.toLocaleString('pt-BR')} bytes</td>
              <td className="whitespace-nowrap px-5 py-4 text-stone-600">{new Date(document.uploadedAt).toLocaleString('pt-BR')}</td>
              <td className="whitespace-nowrap px-5 py-4 text-stone-600">{document.owner || '-'}</td>
              <td className="whitespace-nowrap px-5 py-4">
                <DownloadButton documentId={document.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
