```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Tus credenciales reales configuradas para apps-d45d6
const firebaseConfig = {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
  measurementId: "G-7VCRCRSCRQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "jaddy-inc-elite"; 

export { auth, db, appId, collection, doc, setDoc, addDoc, getDoc, updateDoc, onSnapshot, query, signInAnonymously, onAuthStateChanged };
// --- CONEXIÓN JADDY INC: PRODUCTOS ---

export function guardarProductoJaddy(datosProducto) {
    let productosExistentes = JSON.parse(localStorage.getItem('jaddy_db_productos')) || [];
    productosExistentes.unshift(datosProducto);
    localStorage.setItem('jaddy_db_productos', JSON.stringify(productosExistentes));
}

export function obtenerCatalogoJaddy() {
    return JSON.parse(localStorage.getItem('jaddy_db_productos')) || [];
}



