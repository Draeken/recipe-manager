import { FirebaseApp } from '@firebase/app';
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
declare const firebaseui: any;

export const startAuthDialog = (firebaseApp: FirebaseApp) => {
  const auth = getAuth(firebaseApp);
  const uiConfig = {
    signInSuccessUrl: '/creation',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(auth);
  // The start method will wait until the DOM is loaded.

  ui.start('#firebaseui-auth-container', uiConfig);
};
