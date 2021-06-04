import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const startAuthPopup = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user, token, credential?.idToken);
    })
    .catch((error) => {
      // Handle Errors here.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('auth error', error, credential?.toJSON());
    });
};
