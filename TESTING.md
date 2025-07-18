# 🧪 Testes - FindAFriend API

Este documento explica como executar e entender os testes da aplicação.

## 📋 Tipos de Testes

### 1. **Testes Unitários** (`src/use-cases/*.spec.ts`)
- Testam os casos de uso isoladamente
- Usam repositórios in-memory
- Focam na lógica de negócio
- Executam rapidamente

### 2. **Testes de Integração** (`src/http/controllers/*/*.spec.ts`)
- Testam os controllers HTTP
- Usam banco de dados real (PostgreSQL)
- Testam a integração entre camadas
- Mais lentos, mas mais completos

## 🚀 Como Executar

```bash
# Todos os testes unitários
npm run test

# Testes unitários em modo watch
npm run test:watch

# Testes de integração
npm run test:e2e

# Cobertura de testes
npm run test:coverage

# Interface visual dos testes
npm run test:ui
```

## 🏗️ Estrutura dos Testes

### Testes Unitários
```
src/use-cases/
├── register-org.spec.ts          # Testa registro de organização
├── authenticate-org.spec.ts      # Testa autenticação
├── create-pet.spec.ts           # Testa criação de pet
├── search-pets-by-city.spec.ts  # Testa busca de pets
└── get-pet-details.spec.ts      # Testa detalhes de pet
```

### Testes de Integração
```
src/http/controllers/
├── orgs/
│   ├── register.spec.ts         # Testa endpoint POST /orgs
│   └── authenticate.spec.ts     # Testa endpoint POST /sessions
└── pets/
    ├── create.spec.ts           # Testa endpoint POST /pets
    ├── search.spec.ts           # Testa endpoint GET /pets/search
    └── details.spec.ts          # Testa endpoint GET /pets/:id
```

## 🔧 Configuração

### Ambiente de Teste
- **Banco**: PostgreSQL separado para testes
- **Variáveis**: Arquivo `.env.test`
- **Prisma**: Ambiente isolado para testes

### Repositórios In-Memory
- Implementações em memória para testes unitários
- Não dependem de banco de dados
- Execução rápida e isolada

## 📊 Cobertura

Os testes cobrem:
- ✅ Casos de sucesso
- ✅ Casos de erro
- ✅ Validações
- ✅ Autenticação
- ✅ Autorização
- ✅ Integração com banco

## 🐛 Debugging

Para debugar testes:
```bash
# Executar teste específico
npm run test:watch -- register-org.spec.ts

# Executar com logs detalhados
npm run test -- --reporter=verbose
```

## 📝 Padrões de Teste

### Estrutura dos Testes
```typescript
describe('Nome do Teste', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', async () => {
    // Arrange
    // Act
    // Assert
  })
})
```

### Convenções
- **sut**: System Under Test (objeto sendo testado)
- **repositories**: Repositórios in-memory para isolamento
- **beforeEach**: Setup limpo para cada teste
- **afterEach**: Cleanup após cada teste 