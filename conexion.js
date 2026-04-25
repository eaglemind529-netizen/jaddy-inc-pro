```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración de Firebase extraída de las capturas
const firebaseConfig = {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Función para activar el punto verde
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("Jaddy INC: Conexión establecida");
    } catch (e) {
        console.error("Error de acceso:", e);
    }
};

export { onAuthStateChanged };

```
