```javascript
// Usamos las librerías compatibles con navegadores web
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración real que me acabas de pasar
const firebaseConfig = {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
    measurementId: "G-7VCRCRSCRQ"
};

// Inicialización de los servicios
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Este es el ID de tu proyecto dentro de la base de datos
const appId = "jaddy-inc-inventario"; 

/**
 * Conectar Cerebro: Activa el permiso para escribir datos.
 */
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("✅ Conexión Exitosa con Jaddy Inc.");
    } catch (e) {
        console.error("❌ Error de Autenticación:", e.message);
    }
};

/**
 * Función que usan tus archivos viejos para GUARDAR productos.
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
        console.error("❌ Error al guardar en la nube:", error);
        throw error;
    }
}

/**
 * Función que usan tus archivos viejos para LEER productos.
 */
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Ordenar por nombre automáticamente
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        callback(lista);
    }, (error) => {
        console.error("❌ Error de lectura en tiempo real:", error);
    });
}

// Exportaciones para que archivos como vendedores.html o inventario.html no fallen
export { auth, onAuthStateChanged, db, appId };

```
