```javascript
// Usamos una versión estable de Firebase (10.7.1) para máxima compatibilidad
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de tu base de datos (Verifica estos datos en tu consola de Firebase)
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
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "jaddy-inc-inventario"; 

/**
 * Activa la conexión. 
 * Sin esta función, los archivos no tienen permiso para escribir.
 */
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("✅ Conexión establecida con éxito");
    } catch (e) {
        console.error("❌ Error al conectar:", e.message);
    }
};

/**
 * Función para Productos (Usada por tus archivos viejos)
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
        console.error("❌ Error al subir producto:", error);
        throw error;
    }
}

/**
 * Función para Listar (Usada por tus archivos viejos)
 */
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        callback(lista);
    }, (error) => {
        console.error("❌ Error de lectura en tiempo real:", error);
    });
}

/**
 * Función para Vendedores o cualquier otra categoría
 * Para que no tengas que crear funciones nuevas para cada cosa.
 */
export async function guardarEnColeccion(nombreColeccion, datos) {
    const ruta = ['artifacts', appId, 'public', 'data', nombreColeccion];
    try {
        const colRef = collection(db, ...ruta);
        return await addDoc(colRef, { ...datos, creado: Date.now() });
    } catch (error) {
        console.error("❌ Error al guardar en " + nombreColeccion, error);
        throw error;
    }
}

// Exportaciones fundamentales para la comunicación entre archivos
export { auth, onAuthStateChanged, db, appId };

```
