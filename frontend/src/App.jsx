import { useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/documentsService';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch((listError) => setError(listError.message));
  }, []);

  function handleUploaded(document) {
    setDocuments((current) => [...current, document]);
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Document Management System</h1>
      <UploadComponent onUploaded={handleUploaded} />
      {error && <p role="alert">{error}</p>}
      <DocumentList documents={documents} />
    </main>
  );
}
