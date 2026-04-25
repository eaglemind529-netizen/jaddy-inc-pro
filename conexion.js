```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuración Maestra (No tocar)
const firebaseConfig = {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Este ID es el "nombre del edificio" donde se guarda todo
const appId = "jaddy-inc-inventario"; 

// Conectar Cerebro (Activa la Raya Verde)
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("✅ Conexión establecida con el servidor");
    } catch (e) {
        console.error("❌ Error de conexión:", e.message);
    }
};

/**
 * FUNCIÓN CLAVE: subirProducto
 * Tus archivos viejos buscan esta función específicamente.
 */
export async function subirProducto(datos, id = null) {
    // IMPORTANTE: Tus archivos viejos usan 'productos_jaddy' como nombre de carpeta
    const coleccionDestino = 'productos_jaddy';
    const rutaBase = ['artifacts', appId, 'public', 'data', coleccionDestino];
    
    try {
        if (id) {
            const docRef = doc(db, ...rutaBase, id);
            await updateDoc(docRef, { ...datos, actualizado: Date.now() });
            console.log("✅ Producto actualizado en la nube");
        } else {
            const colRef = collection(db, ...rutaBase);
            await addDoc(colRef, { ...datos, creado: Date.now() });
            console.log("✅ Nuevo producto guardado");
        }
    } catch (error) {
        console.error("❌ Error al guardar:", error);
        throw error;
    }
}

/**
 * FUNCIÓN CLAVE: obtenerProductos
 * Para que las listas se llenen solas.
 */
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(data);
    }, (err) => console.error("❌ Error leyendo productos:", err));
}

// Exportamos todo lo necesario para que los archivos viejos no den error
export { auth, onAuthStateChanged, db, appId, collection, doc, setDoc };

```

