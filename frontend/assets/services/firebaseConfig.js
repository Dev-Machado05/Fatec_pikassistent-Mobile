import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function getEnv(name) {
  const rawValue = process.env[name];

  if (!rawValue) return "";

  // Remove accidental spaces, quotes, and trailing commas from .env values.
  return rawValue
    .trim()
    .replace(/,$/, "")
    .replace(/^['\"]|['\"]$/g, "");
}

const firebaseApiKey = getEnv("EXPO_PUBLIC_FIREBASE_API_KEY");

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: getEnv("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  appId: getEnv("EXPO_PUBLIC_FIREBASE_APP_ID"),
  storageBucket: getEnv("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
};

if (!firebaseApiKey) {
  throw new Error("Missing Firebase API key. Set EXPO_PUBLIC_FIREBASE_API_KEY in your .env file.");
}

if (!firebaseApiKey.startsWith("AIza")) {
  throw new Error(
    "Invalid Firebase API key format. Use the Web API Key from Firebase project settings in EXPO_PUBLIC_FIREBASE_API_KEY.",
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const googleProvider = new GoogleAuthProvider(); // libera o login através do google
