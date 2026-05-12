import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/assets/services/firebaseConfig";

type UseAuthResult = {
  user: User | null;
  userID: string | null;
  userName: string | null;
  loading: boolean;
};

export default function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserID(currentUser.uid);
        setUserName(
          currentUser.displayName ||
          currentUser.email?.split("@")[0] ||
          "Usuário"
        );
      } else {
        setUserID(null);
        setUserName(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
