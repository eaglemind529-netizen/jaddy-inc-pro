```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// 1. Configuración de Firebase (Dinámica + Respaldo)
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

const appId = typeof __app_id !== 'undefined' ? __app_id : 'jaddy-inc-inventario';

// 2. Inicialización
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Gestión de Autenticación (Regla Crítica)
let usuarioActual = null;

const iniciarSesion = async () => {
    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }
    } catch (error) {
        console.error("❌ Error de autenticación:", error);
    }
};

// Escuchar cambios de estado
onAuthStateChanged(auth, (user) => {
    usuarioActual = user;
    if (user) {
        console.log("✅ Conectado a Jaddy INC con UID:", user.uid);
    }
});

// Arrancar conexión
iniciarSesion();

// 4. Funciones de Datos (Rutas estrictas según Regla 1)

/**
 * Guarda un producto nuevo o actualiza uno existente.
 */
export async function guardarProductoJaddy(datos, id = null) {
    if (!usuarioActual) {
        console.warn("Esperando conexión...");
        return;
    }

    // Ruta obligatoria: artifacts/{appId}/public/data/{collection}
    const path = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];

    try {
        if (id) {
            const docRef = doc(db, ...path, id);
            await updateDoc(docRef, { ...datos, ultimaEdicion: Date.now() });
            return id;
        } else {
            const colRef = collection(db, ...path);
            const docRef = await addDoc(colRef, { ...datos, fechaCreacion: Date.now() });
            return docRef.id;
        }
    } catch (error) {
        console.error("🔥 Error al guardar en base de datos:", error);
        throw error;
    }
}

/**
 * Escucha cambios en el catálogo en tiempo real.
 */
export function obtenerCatalogoJaddy(callback) {
    // Solo ejecutamos si hay usuario (aunque sea anónimo)
    onAuthStateChanged(auth, (user) => {
        if (!user) return;

        const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
        
        // Regla 2: Sin consultas complejas (orderBy manual)
        return onSnapshot(colRef, 
            (snapshot) => {
                const productos = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                // Ordenar en memoria (JS) para evitar necesidad de índices en Firestore
                productos.sort((a, b) => (b.fechaCreacion || 0) - (a.fechaCreacion || 0));
                callback(productos);
            }, 
            (error) => {
                console.error("❌ Error de lectura en tiempo real:", error);
            }
        );
    });
}

/**
 * Elimina un producto.
 */
export async function eliminarProductoJaddy(id) {
    if (!usuarioActual) return;
    try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

// Exportación de utilidades
export { db, auth, appId, usuarioActual };

```
