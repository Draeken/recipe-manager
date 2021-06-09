import * as admin from 'firebase-admin';

export const firebaseAdminApp = admin.apps[0] || admin.initializeApp();
