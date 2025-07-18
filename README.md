# FindAFriend API 🐾

API para adoção de animais desenvolvida com Node.js, TypeScript, Fastify e Prisma, seguindo os princípios SOLID e Clean Architecture.

## 🚀 Funcionalidades

- **Cadastro de Organizações**: Registro de ONGs e abrigos
- **Autenticação**: Login com JWT e refresh tokens
- **Cadastro de Pets**: Organizações podem cadastrar pets para adoção
- **Busca de Pets**: Listagem de pets por cidade com filtros
- **Detalhes do Pet**: Visualização completa das informações do pet

## 🛠️ Tecnologias

- **Node.js** com **TypeScript**
- **Fastify** como framework web
- **Prisma** como ORM
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **Zod** para validação
- **Vitest** para testes
- **Docker** para banco de dados

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd find-a-friend-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações

# Para testes, configure também:
cp env.test .env.test
```

4. **Suba o banco de dados**
```bash
docker-compose up -d
```

5. **Execute as migrações**
```bash
npx prisma migrate dev
```

6. **Inicie o servidor de desenvolvimento**
```bash
npm run start:dev
```

## 📚 Endpoints

### Organizações

- `POST /orgs` - Cadastrar organização
- `POST /sessions` - Autenticar organização
- `PATCH /token/refresh` - Renovar token

### Pets

- `POST /pets` - Cadastrar pet (requer autenticação)
- `GET /pets/search` - Buscar pets por cidade
- `GET /pets/:petId` - Obter detalhes de um pet

## 🔐 Autenticação

A API usa JWT para autenticação. Algumas rotas requerem autenticação:

### Rotas Protegidas
- `POST /pets` - Requer token JWT válido

### Rotas Públicas
- `POST /orgs` - Cadastro de organizações
- `POST /sessions` - Login
- `PATCH /token/refresh` - Renovação de token
- `GET /pets/search` - Busca de pets
- `GET /pets/:petId` - Detalhes do pet

### Como usar autenticação

1. **Fazer login:**
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{"email":"sua@org.com","password":"12345678"}'
```

2. **Usar token em requisições protegidas:**
```bash
curl -X POST http://localhost:3333/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"name":"Buddy","description":"Cachorro amigável","age":"YOUNG","size":"MEDIUM","energy_level":"HIGH","independence_level":"MEDIUM","environment":"BOTH","requirements":["Amor","Exercício"]}'
```

### Exemplos de Payload

**Cadastrar Organização:**
```json
{
  "name": "Pet Friends",
  "email": "petfriends@example.com",
  "password": "12345678",
  "address": "Rua das Flores, 123 - São Paulo, SP",
  "whatsapp": "11999999999"
}
```

**Cadastrar Pet:**
```json
{
  "name": "Buddy",
  "description": "Cachorro golden retriever muito amigável",
  "age": "YOUNG",
  "size": "LARGE",
  "energy_level": "HIGH",
  "independence_level": "MEDIUM",
  "environment": "BOTH",
  "requirements": ["Espaço grande", "Exercício diário"]
}
```

## 🧪 Testes

### Configuração do Ambiente de Testes

1. **Configure as variáveis de ambiente para testes:**
```bash
cp env.test .env.test
```

2. **Configure o ambiente Prisma para testes (primeira vez):**
```bash
npm run test:create-prisma-environment
npm run test:install-prisma-enviroment
```

### Executando os Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes de integração
npm run test:e2e

# Verificar cobertura
npm run test:coverage

# Interface visual dos testes
npm run test:ui
```

### Variáveis de Ambiente para Testes

O arquivo `.env.test` deve conter:
```env
# Database
DATABASE_URL="postgresql://docker:docker@localhost:5443/findafriend_test?schema=public"

# App
APP_SECRET="test-secret-key"
NODE_ENV=test
```

**Nota:** Os testes usam um banco de dados separado (`findafriend_test`) para não interferir com o banco de desenvolvimento.

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **SOLID**:

- **Domain Layer**: Casos de uso e regras de negócio
- **Data Layer**: Repositórios e implementações de banco
- **Presentation Layer**: Controllers e rotas HTTP
- **Infrastructure Layer**: Configurações e dependências externas

## 📝 Estrutura do Projeto

```
src/
├── http/                    # Camada de apresentação
│   ├── controllers/         # Controladores HTTP
│   │   ├── orgs/           # Rotas de organizações
│   │   └── pets/           # Rotas de pets
│   └── middlewares/         # Middlewares (JWT, etc.)
├── use-cases/              # Casos de uso (regras de negócio)
│   ├── factories/          # Factories para injeção de dependência
│   └── errors/             # Erros customizados
├── repositories/           # Camada de dados
│   ├── prisma/            # Implementações com Prisma
│   └── in-memory/         # Implementações para testes
├── lib/                   # Bibliotecas externas
├── env/                   # Configuração de ambiente
└── @types/                # Tipos TypeScript
```

## 🐳 Docker

O banco de dados PostgreSQL é executado via Docker:

```bash
# Subir banco
docker-compose up -d

# Parar banco
docker-compose down
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. 