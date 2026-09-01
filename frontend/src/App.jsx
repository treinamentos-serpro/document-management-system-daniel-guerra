import { useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/documentsService';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch((listError) => setError(listError.message))
      .finally(() => setIsLoading(false));
  }, []);

  function handleUploaded(document) {
    setDocuments((current) => [...current, document]);
  }

  return (
    <main className="min-h-screen px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-stone-200/80 bg-white/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Gestão de documentos
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-stone-950 sm:text-4xl">
              Document Management System
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
              Envie, acompanhe e baixe documentos em uma área simples para operação diária.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-64">
            <div className="rounded-md border border-stone-200 bg-stone-50 px-4 py-3">
              <span className="block text-2xl font-bold text-stone-950">{documents.length}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
                Documentos
              </span>
            </div>
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3">
              <span className="block text-2xl font-bold text-emerald-800">
                {isLoading ? '...' : 'OK'}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Status
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)] lg:items-start">
          <UploadComponent onUploaded={handleUploaded} />

          <div className="rounded-lg border border-stone-200/80 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-stone-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-stone-950">Documentos enviados</h2>
                <p className="text-sm text-stone-500">Arquivos disponíveis para consulta e download.</p>
              </div>
            </div>

            {error && (
              <p className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                {error}
              </p>
            )}

            <DocumentList documents={documents} isLoading={isLoading} />
          </div>
        </section>
      </div>
    </main>
  );
}
