```javascript
// Importación de módulos de Firebase versión estable para móviles
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración REAL y CORREGIDA
const firebaseConfig = {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
  measurementId: "G-7VCRCRSCRQ"
};

// Inicialización
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Variables de entorno para las rutas de la base de datos
const appId = "jaddy-luxury-system"; // Identificador de tu app

/**
 * Función para gestionar el estado visual del punto de conexión
 * @param {HTMLElement} dot - El círculo de estado
 * @param {HTMLElement} text - El texto de estado
 */
export const inicializarConexion = (dot, text) => {
    // Intentar autenticación anónima inmediata
    signInAnonymously(auth).catch(err => {
        console.error("Error de autenticación:", err.code);
        if(dot) dot.classList.add('bg-red-600');
        if(text) text.innerText = "ERROR API";
    });

    // Escuchar cambios de estado
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Conectado a Firebase como:", user.uid);
            if (dot) {
                dot.classList.remove('bg-red-600', 'animate-pulse');
                dot.classList.add('bg-green-500');
            }
            if (text) {
                text.innerText = "SISTEMA ONLINE";
                text.classList.replace('text-gray-500', 'text-green-500');
            }
        }
    });
};

// Exportamos las funciones de Firestore para que los módulos las usen directamente
export { 
    db, 
    auth, 
    collection, 
    doc, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    serverTimestamp, 
    deleteDoc,
    appId 
};

```
