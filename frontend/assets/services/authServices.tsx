import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";


type SignUpPayload = {
  email: string;
  password: string;
  username: string;
  team: string;
};

export async function submitLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  return credential.user;
}

export async function submitPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function submitSignUp({
  email,
  password,
  username,
  team,
}: SignUpPayload) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(credential.user, {
    displayName: username,
  });

  try {
    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      email,
      username,
      team,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    const firestoreError = new Error(
      error?.message || "Failed to persist user profile in Firestore.",
    ) as Error & { code?: string; originalCode?: string };

    firestoreError.code = "profile/persist-failed";
    firestoreError.originalCode = error?.code;

    throw firestoreError;
  }

  return credential.user;
}

export async function getAuthToken() {
  const user = auth.currentUser;

  if (!user) return null;

  return await user.getIdToken();
}

// export async function submitGoogleLogin(idToken: string, accessToken?: string) {
//   const credential = GoogleAuthProvider.credential(idToken, accessToken);
//   const result = await signInWithCredential(auth, credential);
//
//   try {
//     await setDoc(
//       doc(db, "users", result.user.uid),
//       {
//         uid: result.user.uid,
//         email: result.user.email,
//         username: result.user.displayName || "",
//         team: "",
//         provider: "google",
//         createdAt: serverTimestamp(),
//       },
//       { merge: true },
//     );
//   } catch (error: any) {
//     const firestoreError = new Error(
//       error?.message || "Failed to persist Google user profile in Firestore.",
//     ) as Error & { code?: string; originalCode?: string };
//
//     firestoreError.code = "profile/persist-failed";
//     firestoreError.originalCode = error?.code;
//
//     throw firestoreError;
//   }
//
//   return result.user;
// }