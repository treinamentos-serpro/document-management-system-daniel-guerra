// Repositório de documentos: metadados mantidos em memória nesta fase.
const documents = new Map();

function create(metadata) {
  documents.set(metadata.id, metadata);
  return metadata;
}

function findAll({ owner } = {}) {
  const all = Array.from(documents.values());
  return owner ? all.filter((doc) => doc.owner === owner) : all;
}

function findById(id) {
  return documents.get(id) || null;
}

module.exports = {
  create,
  findAll,
  findById,
};
