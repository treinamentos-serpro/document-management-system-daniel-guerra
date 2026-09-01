import { useEffect, useState } from 'react';
import { listDocuments } from '../services/documentsService';

// Hook que centraliza o estado e o carregamento da lista de documentos.
export function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch((listError) => setError(listError.message))
      .finally(() => setIsLoading(false));
  }, []);

  function addDocument(document) {
    setDocuments((current) => [...current, document]);
  }

  return { documents, error, isLoading, addDocument };
}
