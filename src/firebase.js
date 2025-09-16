// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tumhara config (jo tumne diya tha)
const firebaseConfig = {
  apiKey: "AIzaSyC5iRanMTNkHYzdaTT7RPK5Y11Zz_Gi5Qs",
  authDomain: "primal-hybrid-312109.firebaseapp.com",
  projectId: "primal-hybrid-312109",
  storageBucket: "primal-hybrid-312109.appspot.com",
  messagingSenderId: "965041353877",
  appId: "1:965041353877:web:562f8912fd6d2f1c4ed79c",
  measurementId: "G-BDTB2EQX29"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init Firestore
export const db = getFirestore(app);
