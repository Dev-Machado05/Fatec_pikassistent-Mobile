

// imports tbm estão comentados nas paginas de Login e SignUp
// codigo base para validação do google, descomentar e 
// aplicar quando necessario





// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useEffect, useState } from "react";
// import { submitGoogleLogin } from "../services/authServices";

// WebBrowser.maybeCompleteAuthSession();

// function getEnv(name: string) {
//   const rawValue = process.env[name];

//   if (!rawValue) return "";

//   return rawValue.trim().replace(/,$/, "").replace(/^['\"]|['\"]$/g, "");
// }

// export function useGoogleAuth() {
//   const [isLoading, setIsLoading] = useState(false);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     webClientId: getEnv("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID"),
//     iosClientId: getEnv("EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"),
//     androidClientId: getEnv("EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID"),
//     scopes: ["profile", "email"],
//   });

//   const signInWithGoogle = useCallback(async () => {
//     if (!request || isLoading) {
//       return null;
//     }

//     setIsLoading(true);

//     try {
//       const authResult = await promptAsync({ useProxy: true });

//       if (authResult.type !== "success") {
//         return null;
//       }

//       const idToken = authResult.authentication?.idToken;
//       const accessToken = authResult.authentication?.accessToken;

//       if (!idToken) {
//         throw new Error("Google sign-in did not return an idToken.");
//       }

//       return await submitGoogleLogin(idToken, accessToken);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoading, promptAsync, request]);

//   useEffect(() => {
//     if (response?.type === "error") {
//       console.error("google auth session error", response.error);
//     }
//   }, [response]);

//   return {
//     signInWithGoogle,
//     isLoading,
//     request,
//     response,
//   };
// }