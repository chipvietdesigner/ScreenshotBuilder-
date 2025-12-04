import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { ScreenshotConfig, ExportConfig } from '../types';

const firebaseConfig = {
    apiKey: "AIzaSyB7NvZ2vICtHxGoC6oxC5x_2Qd2nyFHD0U",
    authDomain: "screenshot-builder-658c9.firebaseapp.com",
    projectId: "screenshot-builder-658c9",
    storageBucket: "screenshot-builder-658c9.firebasestorage.app",
    messagingSenderId: "895853225442",
    appId: "1:895853225442:web:2a09db12a1cb51edad85bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTION_NAME = "screenshotBuilderConfigs";

export interface CloudContextData {
  appType: string;
  tenantId: string;
  screens: ScreenshotConfig[];
  exportConfig: ExportConfig;
  activeScreenIndex: number;
  updatedAt: string;
}

export const saveContextToCloud = async (
  contextKey: string, 
  data: Omit<CloudContextData, 'updatedAt'>
): Promise<boolean> => {
  try {
    await setDoc(doc(db, COLLECTION_NAME, contextKey), {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error saving to cloud:", error);
    throw error;
  }
};

export const loadContextFromCloud = async (contextKey: string): Promise<CloudContextData | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, contextKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as CloudContextData;
    }
    return null;
  } catch (error) {
    console.error("Error loading from cloud:", error);
    return null;
  }
};