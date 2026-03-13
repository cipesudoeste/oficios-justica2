# Sistema de Gerenciamento de Audiências Judiciais (Fase 1)

Plataforma web administrativa para controle de audiências envolvendo policiais militares, com foco em organização operacional, geração de documentos e base para integrações futuras.

## O que o sistema faz

- Dashboard com indicadores operacionais e próximas audiências.
- Listagem com filtros por policial, status, unidade, comarca, data e processos.
- Cadastro manual completo de audiência.
- Upload de PDF com extração inicial de dados por regex.
- Geração de documentos/textos administrativos em português formal.
- Histórico básico com rastreabilidade das ações.

## Stack

- Next.js 15 + App Router
- TypeScript
- React
- Tailwind CSS
- Prisma ORM
- PostgreSQL (produção)
- Zod (validação)
- shadcn/ui-style components (base)
- lucide-react

> Incluímos `prisma/schema.sqlite.prisma` como referência para desenvolvimento local com SQLite, se desejar adaptar.

## Arquitetura

```txt
/app
  /dashboard
  /audiencias
  /audiencias/nova
  /audiencias/[id]
  /api
/components
/lib
  /db
  /services
  /validators
  /utils
/prisma
/public
```

Separação por camadas:
- **Interface**: páginas e componentes em `app/` e `components/`.
- **Rotas server/API**: route handlers em `app/api`.
- **Regras de negócio**: `lib/services`.
- **Acesso a banco**: `lib/db/prisma.ts`.
- **Validação**: `lib/validators` com Zod.
- **Parser PDF**: `lib/services/pdf-parser.ts`.
- **Geradores de textos/documentos**: `lib/services/document-generator.ts`.

## Instalação

```bash
npm install
cp .env.example .env
```

## Rodar localmente

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Acesse: `http://localhost:3000`.

## Banco de dados e migrations

- Criar migration local:
```bash
npm run prisma:migrate
```

- Aplicar migrations em produção:
```bash
npm run prisma:deploy
```

- Popular com dados iniciais:
```bash
npm run prisma:seed
```

## Deploy na Vercel

1. Suba o repositório para GitHub.
2. Importe o projeto na Vercel.
3. Configure variáveis de ambiente:
   - `DATABASE_URL` (PostgreSQL gerenciado)
   - `NEXT_PUBLIC_APP_URL` (URL pública do app)
4. Build command: `npm run build`
5. Instale o banco e rode migrations:
   - Pode usar pipeline CI ou executar `npm run prisma:deploy` após release.

## Fluxo de status (Fase 1)

- RECEBIDA
- TRIAGEM
- AGUARDANDO_PROVIDENCIA
- OFICIO_GERADO
- ENCAMINHADA
- POLICIAL_NOTIFICADO
- CONCLUIDA
- ARQUIVADA

## Limitações atuais da Fase 1

- Parser de PDF é heurístico (regex), com necessidade de revisão manual.
- Não há autenticação/controle de usuários ainda.
- Geração de documentos em texto estruturado (sem exportação PDF final).
- Integrações SEI, e-mail e WhatsApp ficam preparadas para fases seguintes.
