import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Firestore,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { UserProfile } from "../types";
import { INITIAL_PROFILE } from "../data/gamification";

// Initialize Firebase App instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/spreadsheets");
googleProvider.addScope("https://www.googleapis.com/auth/drive.file");

// In-memory access token cache for Google Workspace APIs
let cachedGoogleAccessToken: string | null = null;

export function setGoogleAccessToken(token: string | null) {
  cachedGoogleAccessToken = token;
}

export function getGoogleAccessToken(): string | null {
  return cachedGoogleAccessToken;
}

// Initialize Firestore
export const db: Firestore = (firebaseConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);

/**
 * Sync user profile to/from Firestore
 */
export async function syncUserProfileFromFirestore(
  uid: string,
  fallbackProfile?: Partial<UserProfile>
): Promise<UserProfile> {
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);

  if (snap.exists()) {
    const data = snap.data() as UserProfile;
    return {
      ...INITIAL_PROFILE,
      ...data,
      id: uid,
    };
  }

  // Create new profile if it doesn't exist
  const email = fallbackProfile?.email || auth.currentUser?.email || "";
  const newProfile: UserProfile = {
    ...INITIAL_PROFILE,
    id: uid,
    email: email,
    fullName:
      fallbackProfile?.fullName ||
      auth.currentUser?.displayName ||
      (email ? email.split("@")[0] : "Cadet"),
    username:
      fallbackProfile?.username ||
      (email ? email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "") : "cadet"),
    age: fallbackProfile?.age != null ? fallbackProfile.age : 20,
    avatarUrl: auth.currentUser?.photoURL || INITIAL_PROFILE.avatarUrl,
    authProvider: fallbackProfile?.authProvider || "firebase",
    joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    lastActiveDate: new Date().toISOString().split("T")[0],
  };

  await setDoc(userDocRef, newProfile, { merge: true });
  return newProfile;
}

export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  if (!profile.id) return;
  const userDocRef = doc(db, "users", profile.id);
  await setDoc(userDocRef, profile, { merge: true });
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type FirebaseUser,
};
