```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

// Inicialización
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Función para conectar (El punto verde)
export const conectarCerebro = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        console.log("Jaddy INC: Conectado como", userCredential.user.uid);
        return userCredential.user;
    } catch (e) {
        console.error("Error de conexión:", e);
        return null;
    }
};

// Función para Guardar/Editar
export const subirProducto = async (datos, id = null) => {
    try {
        if (id) {
            await updateDoc(doc(db, "productos", id), datos);
        } else {
            await addDoc(collection(db, "productos"), datos);
        }
        return true;
    } catch (e) {
        console.error("Error al guardar:", e);
        return false;
    }
};

// Función para Listar en tiempo real
export const obtenerProductos = (callback) => {
    const q = query(collection(db, "productos"));
    return onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(docs);
    });
};

export { onAuthStateChanged };

```
