# Contrato da API — Páginas de Links e Links Inteligentes

Este repositório contém o mini app estático. Para persistência no MongoDB e publicação real, a API/worker do EduCashPro deve implementar as rotas abaixo no repositório do backend.

## Regras obrigatórias

- Identificar o proprietário exclusivamente pelo `token` validado no servidor. Nunca aceitar `ownerTgId` enviado pelo navegador.
- Limite de página: 3 links para usuário inativo ou que nunca assinou; 20 links para assinatura ativa.
- Quando uma assinatura vencer, guardar todos os links, mas devolver publicamente somente os três primeiros.
- Quando for renovada, liberar novamente os links guardados, sem migração e sem alterar o `slug`.
- O botão oficial deve ser calculado no servidor no momento da consulta pública. Se o proprietário estiver ativo, gerar o deep link com seu ID; se estiver inativo, aplicar a regra normal de tesouraria/admin.
- Aceitar somente destinos `https://`. Bloquear protocolos locais, credenciais na URL, endereços IP privados, encurtadores recursivos e domínios presentes na lista administrativa de bloqueio.
- Não registrar visualizações, cliques, dispositivo, localização, navegador, ranking, avaliações ou comentários.
- Não armazenar imagens nem arquivos no MongoDB.
- Aplicar rate limit nas rotas de criação, edição e exclusão.

## Documento `link_pages`

```json
{
  "ownerTgId": 123456,
  "slug": "joao",
  "name": "João",
  "bio": "Descrição curta",
  "links": [{ "title": "WhatsApp", "url": "https://..." }],
  "acceptedResponsibilityAt": "2026-09-03T00:00:00.000Z",
  "createdAt": "2026-09-03T00:00:00.000Z",
  "updatedAt": "2026-09-03T00:00:00.000Z"
}
```

Índices: `slug` único e `ownerTgId` único.

## Documento `short_links`

```json
{
  "ownerTgId": 123456,
  "code": "a8K2mQ",
  "label": "Abrir meu conteúdo",
  "destination": "https://...",
  "active": true,
  "acceptedResponsibilityAt": "2026-09-03T00:00:00.000Z",
  "createdAt": "2026-09-03T00:00:00.000Z",
  "updatedAt": "2026-09-03T00:00:00.000Z"
}
```

Índices: `code` único e `{ ownerTgId: 1, createdAt: -1 }`.

## Rotas autenticadas

- `POST /api/hub/link-page` — corpo `{ token }`; retorna `{ ok, page }`.
- `POST /api/hub/link-page/save` — corpo `{ token, page, acceptedResponsibility }`; valida a assinatura, o limite e o conteúdo no servidor.
- `POST /api/hub/short-links` — corpo `{ token }`; retorna somente os links do proprietário.
- `POST /api/hub/short-links/create` — corpo `{ token, destination, label, acceptedResponsibility }`.
- `POST /api/hub/short-links/delete` — corpo `{ token, id }`; exclusão lógica ou desativação restrita ao proprietário.

## Rotas públicas

- `POST /api/public/link-page` — corpo `{ slug, language }`.
- `POST /api/public/short-link` — corpo `{ code, language }`.

A resposta pública deve conter somente campos necessários para renderização. Nunca retornar `ownerTgId`, token, e-mail, telefone privado ou dados administrativos.

Exemplo de página pública:

```json
{
  "ok": true,
  "page": {
    "name": "João",
    "bio": "Descrição curta",
    "links": [{ "title": "WhatsApp", "url": "https://..." }],
    "affiliateUrl": "https://t.me/BOT?start=ref_123456",
    "affiliateCtaLabel": "Crie também sua página no EduCashPro"
  }
}
```

Usar `Cache-Control: public, max-age=60, s-maxage=300` nas consultas públicas. Invalidar ou versionar o cache após edição, mudança de atividade do proprietário ou bloqueio administrativo.
