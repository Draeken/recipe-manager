import { IncomingMessage } from 'node:http';
import { firebaseAdminApp } from './initFirebase';

interface MicroRequest extends IncomingMessage {
  filePayload?: Record<string, unknown>;
}

const getIdToken = (req): string => {
  const authHeader: string = req.headers.authorization || '';
  const components = authHeader.split(' ');
  return components.length > 1 ? components[1] : '';
};

export const context = async ({ req }: { req: MicroRequest }) => {
  const idToken = getIdToken(req);
  const verified = await firebaseAdminApp.auth().verifyIdToken(idToken);
  verified.uid;
};
