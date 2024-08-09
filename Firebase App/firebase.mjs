import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBoknXzjTvqiMZwlQIyLB7bAo7q5-oYtfg",
  authDomain: "javascript-projects-418a1.firebaseapp.com",
  projectId: "javascript-projects-418a1",
  storageBucket: "javascript-projects-418a1.appspot.com",
  messagingSenderId: "706290212672",
  appId: "1:706290212672:web:d2917e790a9534af8f24a5"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);