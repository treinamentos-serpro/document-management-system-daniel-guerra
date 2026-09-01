---
description: Moderniza o visual do frontend do DMS usando Tailwind CSS 3.
name: melhorar-visual-tailwind
argument-hint: foco opcional da melhoria visual (ex. dashboard, upload, listagem, responsividade)
agent: dms-tailwind-ui
---

# Melhorar visual do DMS com Tailwind CSS 3

Melhore o visual do frontend do Document Management System usando Tailwind CSS 3, considerando o foco `${input:foco:foco opcional da melhoria visual}` quando informado.

## Objetivo

Transforme a interface atual em uma experiencia mais polida, responsiva e profissional para gestao de documentos, mantendo a aplicacao simples e funcional.

## Escopo principal

- Configure Tailwind CSS 3 no projeto `frontend`, caso ainda nao exista configuracao.
- Aplique Tailwind nos componentes React existentes:
  - `frontend/src/App.jsx`
  - `frontend/src/components/UploadComponent.jsx`
  - `frontend/src/components/DocumentList.jsx`
  - `frontend/src/components/DownloadButton.jsx`
- Crie ou ajuste arquivos globais de estilo apenas quando necessario para ativar Tailwind e estilos base.
- Preserve os servicos em `frontend/src/services` e o contrato atual com o backend.

## Requisitos visuais

- A primeira tela deve ser a propria experiencia do DMS, nao uma pagina de marketing.
- Crie uma estrutura clara com cabecalho, resumo contextual, formulario de upload e lista de documentos.
- Use layout responsivo, com boa leitura em mobile e desktop.
- Distingua estados de vazio, carregamento, erro e sucesso quando esses estados existirem no codigo.
- Estilize formulario, input de dono, input de arquivo, botoes, tabela/lista e mensagens de erro.
- Priorize acessibilidade: labels associados, foco visivel, contraste adequado e `role="alert"` preservado para erros.
- Mantenha os textos de interface em portugues.

## Restricoes

- Nao altere backend, endpoints ou regras de negocio.
- Nao introduza TypeScript.
- Nao substitua `fetch` por outra biblioteca.
- Nao crie abstracoes grandes ou design system prematuro.
- Nao use armazenamento externo ou qualquer dependencia de upload de terceiros.

## Validacao

Depois de implementar, execute:

```bash
cd frontend
npm run build
```

Corrija problemas relacionados a mudanca visual ate o build passar.

## Resultado esperado

Ao finalizar, apresente um resumo curto com:

1. O que foi alterado.
2. Como o Tailwind CSS 3 foi configurado.
3. Resultado do `npm run build`.