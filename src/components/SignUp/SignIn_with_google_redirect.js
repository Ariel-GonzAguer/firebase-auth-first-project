import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

async function signInWithGoogleRedirect() {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error during sign in: ", error.code, error.message);
  }
}

export default signInWithGoogleRedirect;
