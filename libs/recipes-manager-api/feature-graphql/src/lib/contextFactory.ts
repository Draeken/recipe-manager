import { IncomingMessage } from 'node:http';
import { createLoader } from './datastoreLoader';
import { firebaseAdminApp } from './initFirebase';

interface MicroRequest extends IncomingMessage {
  filePayload?: Record<string, unknown>;
}

const getIdToken = (req): string => {
  const authHeader: string = req.headers.authorization || '';
  const components = authHeader.split(' ');
  return components.length > 1 ? components[1] : '';
};

export const context = ({ store }) => async ({ req }: { req: MicroRequest }) => {
  try {
    const idToken = getIdToken(req);
    const verified = await firebaseAdminApp.auth().verifyIdToken(idToken);
    return { userId: verified.uid, dataloader: createLoader(store) }; //TODO: check firebase custom role
  } catch (e) {
    console.error('Error verifying user token', e);
  }
};
