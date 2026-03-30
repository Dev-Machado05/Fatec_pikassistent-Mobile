# Pikassistent - Full-Stack Pokémon Assistant

Este é um projeto full-stack que consiste em um aplicativo móvel (Pikassistent Mobile) e um servidor de backend. O aplicativo parece ser um assistente de Pokémon, com Pokedex, um chatbot e autenticação de usuário.

## Visão Geral da Arquitetura

-   **Frontend:** Um aplicativo móvel construído com [Expo](https://expo.dev/) e [React Native](https://reactnative.dev/). Ele fornece a interface do usuário para interagir com os recursos do aplicativo.
-   **Backend:** Um servidor [Node.js](https://nodejs.org/) usando [Express.js](https://expressjs.com/) que serve como a API para o aplicativo móvel. Ele se integra com a [API Groq](https://groq.com/) para fornecer a funcionalidade de chatbot com IA.

## Estrutura do Projeto

O monorepo está organizado da seguinte forma:

-   `frontend/`: Contém todo o código-fonte do aplicativo móvel Expo.
-   `backend/`: Contém todo o código-fonte do servidor Express.js.
-   `README.md`: Este arquivo, fornecendo uma visão geral de todo o projeto.

## Começando

Para executar o projeto completo, você precisará iniciar o servidor de backend e o aplicativo de frontend separadamente.

### Backend Setup

1.  **Navegue até o diretório do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na pasta `backend` e adicione sua chave da API Groq:
    ```
    GROQ_API_KEY=sua_chave_de_api_aqui
    ```

4.  **Inicie o servidor de backend:**
    ```bash
    npm start
    ```
    O servidor estará em execução em `http://localhost:7070`.

### Frontend Setup

1.  **Navegue até o diretório do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o aplicativo:**
    ```bash
    npx expo start
    ```
    Isso abrirá as ferramentas de desenvolvedor do Expo em seu navegador. Você pode então executar o aplicativo em:
    - Um emulador ou dispositivo Android
    - Um simulador ou dispositivo iOS
    - No seu navegador da web

## Scripts Disponíveis

### Backend (`/backend`)

-   `npm start`: Inicia o servidor de desenvolvimento do backend.
-   `npm test`: Executa um script de teste de espaço reservado.

### Frontend (`/frontend`)

-   `npm start`: Inicia o servidor de desenvolvimento do Expo.
-   `npm run android`: Executa o aplicativo em um dispositivo ou emulador Android conectado.
-   `npm run ios`: Executa o aplicativo em um simulador ou dispositivo iOS.
-   `npm run web`: Executa o aplicativo em um navegador da web.
-   `npm run lint`: Executa o linter nos arquivos do projeto.

## Saiba Mais

Para saber mais sobre as tecnologias usadas neste projeto, consulte os seguintes recursos:

-   [Documentação do Expo](https://docs.expo.dev/)
-   [Documentação do React Native](https://reactnative.dev/docs)
-   [Documentação do Expo Router](https://docs.expo.dev/router/introduction/)
-   [Documentação do Express.js](https://expressjs.com/)
-   [Documentação da API Groq](https://console.groq.com/docs)
