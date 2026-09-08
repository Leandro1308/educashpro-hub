# EduCashPro Hub

Mini App do EduCashPro para Telegram. O produto reúne presença profissional, página de links, agenda, serviços, educação aplicada, benefícios, diretório e jogos educativos processados localmente.

## Proposta do produto

O núcleo do EduCashPro é ajudar profissionais, criadores e pequenos negócios a divulgar seu trabalho, organizar atendimentos e desenvolver habilidades digitais dentro do Telegram. O Programa de Afiliados é um benefício opcional da assinatura ativa e pode ser organizado pelo interessado como atividade secundária e possível fonte complementar de renda.

## Acesso

- Recursos livres: Central de Ajuda, parte da Academy, página com até 3 links, links inteligentes dentro do limite gratuito, simuladores e jogos básicos.
- Assinatura ativa: Perfil Profissional completo, até 20 links, agenda, cursos exclusivos, diretório, benefícios, parceiros, níveis avançados e Programa de Afiliados.

## Arquitetura

- GitHub Pages: interface estática e recursos locais.
- API oficial: `https://educashpro-all.onrender.com`.
- Telegram Web App: autenticação através de `initData`.
- MongoDB: dados que precisam permanecer sincronizados.
- localStorage: preferências, progresso de cursos e recordes locais.

O domínio da API é fixo. Parâmetros públicos não podem substituir o destino que recebe os dados de autenticação do Telegram.

## Módulos principais

- `app.js`: sessão, navegação e áreas principais.
- `professional-profile.js`: painel profissional, cartão digital, QR, vCard e calendário.
- `help-center.js`: orientações gratuitas, ações contextuais e conceitos como iscas digitais.
- `link-tools.js`: página pública e links inteligentes.
- `agenda.js`: serviços, clientes, equipe e compromissos.
- `resource-loader.js`: carregamento sob demanda de cursos e jogos.
- `game-suite.js`: jogos e torneios. Rifas não fazem parte do portfólio.

## Aprendizagem

- Central de Ajuda: guias curtos com botão que abre diretamente a função ensinada.
- Academy: trilhas de formação e cursos gratuitos ou exclusivos.
- Leitor contínuo: capítulos completos em uma página no estilo livro digital, sumário, ajuste de fonte e progresso local.
- Ferramentas: simuladores e calculadoras permanecem fora do catálogo de cursos.

Os conteúdos exclusivos são obtidos pela API após validação da sessão. A leitura e o progresso funcionam localmente após o carregamento, evitando gravações por rolagem no MongoDB.

## Verificação

```bash
node tests/static-audit.mjs
```

O teste confere sintaxe, fronteira da API, retirada das rifas da navegação, carregamento sob demanda, integração do Perfil Profissional e presença das traduções.

## Publicação

O workflow `.github/workflows/pages.yml` publica o branch `main` no GitHub Pages. Antes de publicar:

1. Execute a auditoria estática.
2. Verifique usuário ativo e inativo.
3. Verifique abertura pública, página de links e agenda.
4. Confirme os quatro idiomas.
5. Atualize `version.json` para invalidar caches antigos.
