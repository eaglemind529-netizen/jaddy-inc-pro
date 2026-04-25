```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Datos de tu proyecto verificados
const firebaseConfig = JSON.parse('{"apiKey":"AIzaSyCcAnybOnm9LOKgIAoykhFygp23jLyX9ZY","authDomain":"apps-d45d6.firebaseapp.com","projectId":"apps-d45d6","storageBucket":"apps-d45d6.firebasestorage.app","messagingSenderId":"502648373937","appId":"1:502648373937:web:8c3beaa2a6c9289a4d9890"}');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'jaddy-inc-inventario';

/**
 * CONEXIÓN MAESTRA
 * Esta función usa el token del sistema para abrir la puerta de una vez.
 */
export const conectarCerebro = async () => {
    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }
        console.log("✅ Conexión forzada y establecida");
    } catch (e) {
        console.error("❌ Fallo de autenticación:", e.message);
    }
};

/**
 * SUBIR DATOS (REGLA 1: Ruta estricta)
 * Si no usas esta ruta exacta, Firebase te da error de permisos.
 */
export async function subirProducto(datos, id = null) {
    if (!auth.currentUser) {
        console.error("No hay usuario autenticado");
        return;
    }

    // RUTA OBLIGATORIA: /artifacts/{appId}/public/data/{collectionName}
    const rutaPublica = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];

    try {
        if (id) {
            const docRef = doc(db, ...rutaPublica, id);
            await updateDoc(docRef, { ...datos, ultima_edicion: Date.now() });
        } else {
            const colRef = collection(db, ...rutaPublica);
            await addDoc(colRef, { ...datos, fecha_registro: Date.now() });
        }
        return true;
    } catch (error) {
        console.error("🔥 Error de escritura en Firestore:", error);
        throw error;
    }
}

/**
 * LEER DATOS (REGLA 2: No queries complejas)
 */
export function obtenerProductos(callback) {
    if (!auth.currentUser) return;

    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    
    // Escuchador en tiempo real con manejador de errores obligatorio
    return onSnapshot(colRef, (snap) => {
        const productos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(productos);
    }, (error) => {
        console.error("❌ Error leyendo productos:", error);
    });
}

export { auth, onAuthStateChanged, db, appId };

```
