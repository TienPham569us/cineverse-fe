import admin from 'firebase-admin';
//const serviceAccount = require('../../serviceAccountKey.json');

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  privateKeyId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  clientId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  authUri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
  tokenUri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
  authProviderX509CertUrl: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  clientX509CertUrl: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  universeDomain: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(refreshToken, true);
      const uid = decodedToken.uid;
      const newToken = await admin.auth().createCustomToken(uid);
      return newToken;
    } catch (error: any) {
      throw new Error('Failed to refresh access token: ' + error.message);
    }
  };

export default admin;