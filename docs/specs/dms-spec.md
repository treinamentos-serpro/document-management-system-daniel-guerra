# Especificação - Document Management System

## 1. Objetivo

Permitir que usuários enviem, listem e baixem documentos de forma simples, com
armazenamento dos arquivos no filesystem local da aplicação.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário (identificação via campo `owner`, sem autenticação completa)

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Autenticação e autorização robustas
- Exclusão de documentos

## 3. Requisitos funcionais

| ID    | Requisito                                                        |
| ----- | ----------------------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento                                 |
| RF-02 | O usuário pode listar os documentos enviados                      |
| RF-03 | O usuário pode baixar um documento pelo identificador              |
| RF-04 | O usuário pode listar apenas os documentos de um dono (`owner`)    |
| RF-05 | O sistema retorna erro apropriado quando o documento não é encontrado |

## 4. Requisitos não funcionais

| ID     | Requisito                                                          |
| ------ | -------------------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local via multer com `diskStorage`   |
| RNF-02 | Metadados dos documentos mantidos em memória nesta fase               |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor)                     |
| RNF-04 | Erros tratados nos limites do sistema (entrada HTTP, filesystem)       |
| RNF-05 | Limite de tamanho de upload configurável via variável de ambiente     |

## 5. Modelo de dados (metadados do documento)

| Campo          | Tipo   | Descrição                                                    |
| -------------- | ------ | -------------------------------------------------------------- |
| id             | string | Identificador único do documento (UUID v4)                      |
| originalName   | string | Nome original do arquivo enviado, usado para exibição            |
| storedFileName | string | Nome físico do arquivo no disco, diferente do `originalName`     |
| size           | number | Tamanho em bytes                                                 |
| mimeType       | string | Tipo MIME do arquivo enviado                                     |
| uploadedAt     | string | Data/hora do upload (ISO 8601)                                   |
| owner          | string | Identificador do usuário dono                                    |

Separar `originalName` de `storedFileName` evita colisões de nomes de arquivo e
mitiga ataques de path traversal no momento do download.

## 6. Contratos de API

### POST /upload

- Entrada: arquivo via campo `file` (multipart/form-data)
- Saída de sucesso: `201 Created` com os metadados do documento criado
- Erros: `400 Bad Request` se nenhum arquivo for enviado; `413 Payload Too Large`
  se o arquivo exceder o limite configurado

### GET /documents

- Saída de sucesso: `200 OK` com lista de metadados de documentos
- Parâmetro opcional: `owner` (query string) para filtrar por dono

### GET /documents/:id/download

- Saída de sucesso: `200 OK` com o conteúdo binário do arquivo e cabeçalho
  `Content-Disposition` contendo o `originalName`
- Erros: `404 Not Found` se o `id` não existir

### Formato de erro padrão

```json
{ "error": "mensagem em português" }
```

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples, com fluxo de dependência
  `routes -> controllers -> services -> repositories`; camadas internas não
  conhecem camadas externas.
- Frontend baseado em componentes React (`UploadComponent`, `DocumentList`,
  `DownloadButton`) consumindo a API via `fetch` em `services/`.
- Armazenamento local apenas, usando multer com `diskStorage` apontando para
  `backend/storage`.
- Metadados mantidos em memória no repository (ex.: array ou `Map`).

### Riscos e mitigações

| Risco                                                        | Mitigação                                                          |
| -------------------------------------------------------------- | --------------------------------------------------------------------- |
| Perda dos metadados ao reiniciar o processo (armazenamento em memória) | Aceito nesta fase; documentar como limitação conhecida               |
| Concorrência de acesso à estrutura em memória                  | Operações simples e síncronas na camada de repository                |
| Ausência de autenticação real                                    | Uso do campo `owner` apenas como identificador simples nesta fase    |
| Path traversal ao acessar arquivos no download                   | Validar formato do `id` e usar `storedFileName` controlado pelo servidor |

## 8. Plano de execução

1. Implementar a camada `repositories` (armazenamento em memória dos metadados
   e acesso ao filesystem via multer)
2. Implementar a camada `services` (regras de negócio de upload, listagem e
   download)
3. Implementar a camada `controllers` e `routes` (endpoints HTTP)
4. Implementar o frontend (`UploadComponent`, `DocumentList`, `DownloadButton`
   e `services/` de comunicação com a API)
5. Implementar testes automatizados (`node:test`) para as camadas de backend
