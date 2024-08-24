# API Find a friend

Este projeto consiste em uma API para adoção de animais. A API é projetada para gerenciar duas principais entidades: **Organizações** e **Pets**. 

## Visão Geral

- **Organizações (Orgs):** Entidades responsáveis por registrar e gerenciar os pets disponíveis para adoção. Apenas organizações autenticadas e autorizadas podem realizar operações de registro de pets.

- **Pets:** Animais disponíveis para adoção. Cada pet possui informações detalhadas, como nome, descrição, idade, tamanho, nível de energia, ambiente ideal e requisitos especiais para adoção. Os detalhes dos pets são gerenciados pelas organizações e podem ser consultados por usuários interessados na adoção.

## Endpoints

### Criar Organização

- **URL:** `/orgs`
- **Método:** `POST`
- **Descrição:** Endpoint para criar uma nova organização.

#### Parâmetros

- **Body:**
  - `name` (string): Nome da organização.
  - `author_name` (string): Nome do autor/criador da organização.
  - `email` (string): Email da organização (deve ser um email válido).
  - `whatsapp` (string): Número de WhatsApp da organização.
  - `password` (string): Senha da organização (mínimo 6 caracteres).
  - `zip_code` (string): CEP da organização.
  - `state` (string): Estado onde a organização está localizada.
  - `city` (string): Cidade onde a organização está localizada.
  - `neighborhood` (string): Bairro onde a organização está localizada.
  - `street` (string): Rua onde a organização está localizada.
  - `latitude` (number): Latitude da organização (deve estar entre -90 e 90).
  - `longitude` (number): Longitude da organização (deve estar entre -180 e 180).

#### Resposta

- `201 Created`: Retorna a organização criada.
- `400 Bad Request`: Se a organização já existir, retorna uma mensagem de erro.

---

### Buscar Organizações Próximas

- **URL:** `/orgs`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de organizações próximas com base na localização do usuário.

#### Parâmetros

- **Query:**
  - `latitude` (number): Latitude do usuário (deve estar entre -90 e 90).
  - `longitude` (number): Longitude do usuário (deve estar entre -180 e 180).

#### Resposta

- `200 OK`: Retorna uma lista de organizações próximas.
- `500 Internal Server Error`: Em caso de erro interno, retorna uma mensagem de erro.

---

### 3. Autenticar Organização

- **URL:** `/sessions`
- **Método:** `POST`
- **Descrição:** Endpoint para autenticar uma organização e gerar tokens de acesso.

#### Parâmetros

- **Body:**
  - `email` (string): Email da organização (deve ser um email válido).
  - `password` (string): Senha da organização (mínimo 6 caracteres).

#### Resposta

- `200 OK`: Retorna um token de acesso e configura um cookie com o refresh token.
- `400 Bad Request`: Se as credenciais forem inválidas, retorna uma mensagem de erro.

---

### Atualizar Token de Acesso

- **URL:** `/token/refresh`
- **Método:** `PATCH`
- **Descrição:** Endpoint para renovar o token de acesso usando o refresh token.

#### Parâmetros

- Nenhum.

#### Resposta

- `200 OK`: Retorna um novo token
- `401 Unauthorized`: Se a verificação do JWT falhar, retorna uma mensagem de erro.


### Criar Pet

- **URL:** `/pets`
- **Método:** `POST`
- **Descrição:** Endpoint para criar um novo pet. Requer autenticação via JWT.

#### Parâmetros

- **Body:**
  - `name` (string): Nome do pet.
  - `about` (string): Descrição sobre o pet.
  - `age` (enum): Idade do pet. Valores possíveis: `PUPPY`, `ADULT`, `SENIOR`.
  - `size` (enum): Tamanho do pet. Valores possíveis: `SMALL`, `MEDIUM`, `LARGE`.
  - `energy_level` (enum): Nível de energia do pet. Valores possíveis: `LOW`, `MEDIUM`, `HIGH`.
  - `environment` (enum): Ambiente ideal para o pet. Valores possíveis: `SMALL`, `MEDIUM`, `LARGE`.
  - `requirements` (array): Requisitos especiais para adoção do pet (array de strings).

#### Resposta

- `201 Created`: Retorna o pet criado.
- `404 Not Found`: Se a organização associada ao pet não for encontrada.
- `500 Internal Server Error`: Em caso de erro interno.

### Buscar Pets

- **URL:** `/pets`
- **Método:** `GET`
- **Descrição:** Endpoint para buscar pets com base em filtros específicos.

#### Parâmetros

- **Query:**
  - `city` (string): Cidade onde o pet está localizado.
  - `age` (enum, opcional): Idade do pet. Valores possíveis: `PUPPY`, `ADULT`, `SENIOR`.
  - `size` (enum, opcional): Tamanho do pet. Valores possíveis: `SMALL`, `MEDIUM`, `LARGE`.
  - `energy_level` (enum, opcional): Nível de energia do pet. Valores possíveis: `LOW`, `MEDIUM`, `HIGH`.
  - `environment` (enum, opcional): Ambiente ideal para o pet. Valores possíveis: `SMALL`, `MEDIUM`, `LARGE`.

#### Resposta

- `200 OK`: Retorna uma lista de pets que correspondem aos filtros aplicados.
- `500 Internal Server Error`: Em caso de erro interno.

### Obter Detalhes de um Pet

- **URL:** `/pets/:id`
- **Método:** `GET`
- **Descrição:** Endpoint para obter detalhes de um pet específico.

#### Parâmetros

- **Route:**
  - `id` (string): ID do pet que deseja obter detalhes.

#### Resposta

- `200 OK`: Retorna os detalhes do pet.
- `404 Not Found`: Se o pet não for encontrado.
- `500 Internal Server Error`: Em caso de erro interno.
