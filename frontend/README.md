# Pikassistent Mobile

This is a mobile application built with Expo and React Native. It appears to be a Pokémon assistant application, featuring a Pokedex, a chatbot, and user authentication.

## Get started

1.  **Install dependencies**

    ```bash
    npm install
    ```

2.  **Start the app**

    ```bash
    npx expo start
    ```

    This will open the Expo developer tools in your browser. You can then run the app on:
    - An Android emulator or device
    - An iOS simulator or device
    - In your web browser

## Project Structure

The project is organized as follows:

- `app/`: Contains all the routes for the application, using file-based routing from `expo-router`.
  - `auth/`: Authentication-related screens (login, sign up).
  - `chatBot/`: Chatbot interface.
  - `home/`: The main screen of the app after logging in.
  - `landingPage/`: The initial screen of the app.
  - `Pokedex/`: The Pokémon encyclopedia section.
- `assets/`: Contains global components, custom hooks, and images.
  - `globalComponents/`: Reusable components used across the app.
  - `hooks/`: Custom React hooks.
  - `images/`: Static image assets.
- `app.json`: Expo configuration file.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.

## Available Scripts

- `npm start`: Starts the development server.
- `npm run android`: Runs the app on a connected Android device or emulator.
- `npm run ios`: Runs the app on an iOS simulator or device.
- `npm run web`: Runs the app in a web browser.
- `npm run lint`: Lints the project files using ESLint.

## Learn More

To learn more about the technologies used in this project, see the following resources:

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
