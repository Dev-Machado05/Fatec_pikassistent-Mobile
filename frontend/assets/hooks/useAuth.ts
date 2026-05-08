import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/assets/services/firebaseConfig";

type UseAuthResult = {
  user: User | null;
  userID: string | null;
  userName: string | null;
  loading: boolean;
};

export default function useAuth() {
  let user: User | null = null;
  let userID: string | null = null;
  let userName: string | null = null;
  let loading = true;

  const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    user = currentUser;

    if (currentUser) {
      userID = currentUser.uid;
      userName =
        currentUser.displayName ||
        currentUser.email?.split("@")[0] ||
        "Usuário";
    } else {
      userID = null;
      userName = null;
    }

    loading = false;
  });

  unsubscribeAuth();

  return { user, userID, userName, loading };
} 

/*
Exemplo de uso:

import { useAuth } from "@/assets/hooks/useAuth";

export default function HomeScreen() {
  const { userID, userName, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Text>
      {userName ? `Bem-vindo, ${userName}` : "Usuário não autenticado"}
    </Text>
  );
}
*/
