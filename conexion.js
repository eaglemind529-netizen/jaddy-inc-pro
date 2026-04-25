```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuración Maestra - Jaddy INC
const firebaseConfig = {
    apiKey: "AIzaSyCcAnybOnm9LOKgIAoykhFygp23jLyX9ZY",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

// Inicializar servicios
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "jaddy-inc-inventario"; 

/**
 * CONEXIÓN DE REPARACIÓN
 * Al borrar la navegación, necesitamos forzar una sesión nueva limpia.
 */
export const conectarCerebro = async () => {
    try {
        // Forzamos el ingreso anónimo para recuperar la sesión borrada
        await signInAnonymously(auth);
        console.log("🚀 Sesión recuperada tras limpieza");
    } catch (e) {
        console.error("❌ Error al recuperar sesión:", e.code);
        if (e.code === 'auth/unauthorized-domain') {
            alert("DOMINIO NO AUTORIZADO: Debes agregar esta dirección en la consola de Firebase.");
        }
    }
};

/**
 * GUARDAR PRODUCTOS
 */
export async function subirProducto(datos, id = null) {
    const ruta = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];
    try {
        if (id) {
            const docRef = doc(db, ...ruta, id);
            await updateDoc(docRef, { ...datos, fecha_update: Date.now() });
        } else {
            const colRef = collection(db, ...ruta);
            await addDoc(colRef, { ...datos, fecha_creacion: Date.now() });
        }
        return true;
    } catch (error) {
        console.error("🔥 Error de escritura:", error);
        throw error;
    }
}

/**
 * LISTAR PRODUCTOS
 */
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const productos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(productos);
    }, (error) => {
        console.error("❌ Error de lectura en tiempo real:", error);
    });
}

// Exportamos todo lo que tus otros archivos necesitan
export { auth, onAuthStateChanged, db, deleteDoc, doc, collection };

```
