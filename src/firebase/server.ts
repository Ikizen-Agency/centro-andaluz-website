
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

function getFirebaseAdminOptions(): FirebaseOptions {
    return {
        ...firebaseConfig,
        // projectId is already in firebaseConfig
    };
}

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    let app;
    try {
      // Attempt to initialize via GOOGLE_APPLICATION_CREDENTIALS
      app = initializeApp();
    } catch (e) {
      console.warn('Admin SDK automatic initialization failed. Falling back to firebase config object.', e);
      // Fallback to config object if auto-init fails (e.g., local dev without credentials set)
      app = initializeApp(getFirebaseAdminOptions());
    }
    return getSdks(app);
  }
  return getSdks(getApp());
}


export function getSdks(app = getApp()) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
  };
}

export const { firestore, auth } = initializeFirebaseAdmin();
