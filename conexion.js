```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuración Maestra
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

// IMPORTANTE: Este ID debe ser idéntico al que declaraste en el HTML
const appId = "jaddy-inc-inventario"; 

/**
 * Conecta el sistema y activa el punto verde
 */
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("✅ Conexión Jaddy INC Establecida");
    } catch (e) {
        console.error("❌ Error de enlace:", e.message);
    }
};

/**
 * SUBIR PRODUCTO
 * Adaptada exactamente para los campos de tu productos.html:
 * (codigo, nombre, costo, precio_detal, precio_credito, precio_mayor, variantes)
 */
export async function subirProducto(datos, id = null) {
    // Usamos la ruta oficial para evitar errores de permisos
    const rutaBase = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];
    
    try {
        if (id) {
            const docRef = doc(db, ...rutaBase, id);
            await updateDoc(docRef, { ...datos, actualizado: Date.now() });
            console.log("✅ Producto actualizado");
        } else {
            const colRef = collection(db, ...rutaBase);
            await addDoc(colRef, { ...datos, creado: Date.now() });
            console.log("✅ Producto registrado");
        }
    } catch (error) {
        console.error("🔥 Error crítico al guardar:", error);
        // Si sale "Permissions Denied", revisa las REGLAS en la consola de Firebase
        throw error;
    }
}

/**
 * OBTENER PRODUCTOS
 * Mantiene la lista de productos.html actualizada en tiempo real
 */
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    
    return onSnapshot(colRef, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Ordenamos por nombre para que no salgan desordenados en la lista maestra
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        callback(lista);
    }, (error) => {
        console.error("❌ Fallo al leer catálogo:", error);
    });
}

// Exportamos todo para que el HTML no de error de "undefined"
export { auth, onAuthStateChanged, db, appId };

```
