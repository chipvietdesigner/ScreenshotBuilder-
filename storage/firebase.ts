import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import { ScreenshotConfig } from '../types';

// NOTE: Replace these values with your own Firebase project configuration
// You can get these from the Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "00000000000",
  appId: "1:00000000000:web:00000000000000"
};

let db: Firestore | null = null;
let isConfigured = false;

try {
  // Simple check to see if config is still default placeholder
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isConfigured = true;
  } else {
    console.warn("Firebase config is missing. Cloud features will be simulated or disabled.");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

const COLLECTION_NAME = "screenshotsBuilderData";

export const saveContextToCloud = async (contextKey: string, screens: ScreenshotConfig[]): Promise<boolean> => {
  if (!db || !isConfigured) {
    // Simulate a network request for demo purposes if no config
    return new Promise((resolve) => {
        console.log("Simulating Cloud Save...", { contextKey, screens });
        setTimeout(() => resolve(true), 1000);
    });
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, contextKey), {
      updatedAt: new Date().toISOString(),
      screens
    });
    return true;
  } catch (error) {
    console.error("Error saving to cloud:", error);
    throw error;
  }
};

export const loadContextFromCloud = async (contextKey: string): Promise<ScreenshotConfig[] | null> => {
  if (!db || !isConfigured) {
     // Simulate network delay
     return new Promise((resolve) => {
        setTimeout(() => resolve(null), 800);
     });
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, contextKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.screens as ScreenshotConfig[];
    }
    return null;
  } catch (error) {
    console.error("Error loading from cloud:", error);
    return null;
  }
};
