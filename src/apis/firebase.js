import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const login = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch(console.error);
};

export const logout = async () => {
  return signOut(auth)
    .then(() => {
      return null;
    })
    .catch(console.error);
};

export const onLoginStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
