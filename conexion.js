```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuración con tu NUEVA API KEY proporcionada
const firebaseConfig = {
    apiKey: "AIzaSyCcAnybOnm9LOKgIAoykhFygp23jLyX9ZY",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

// Inicialización corregida
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "jaddy-inc-inventario"; 

/**
 * Activa la conexión para poner el punto en VERDE
 */
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("✅ Conexión Jaddy INC: Activa");
    } catch (e) {
        console.error("❌ Error de enlace Firebase:", e.message);
    }
};

/**
 * Función para guardar productos (Usada por productos.html)
 */
export async function subirProducto(datos, id = null) {
    const ruta = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];
    try {
        if (id) {
            const docRef = doc(db, ...ruta, id);
            return await updateDoc(docRef, { ...datos, editado: Date.now() });
        } else {
            const colRef = collection(db, ...ruta);
            return await addDoc(colRef, { ...datos, creado: Date.now() });
        }
    } catch (error) {
        console.error("🔥 Error al guardar dato:", error);
        throw error;
    }
}

/**
 * Función para leer productos en tiempo real
 */
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Ordenar alfabéticamente por nombre
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        callback(lista);
    }, (error) => {
        console.error("❌ Error de lectura:", error);
    });
}

// Exportaciones para compatibilidad
export { auth, onAuthStateChanged, db, appId };

```
