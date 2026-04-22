```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
  measurementId: "G-7VCRCRSCRQ"
};

// Inicialización
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "jaddy-inc-elite"; 

// --- LÓGICA DE CONEXIÓN Y AUTENTICACIÓN ---
let usuarioConectado = null;

const conectar = async () => {
    try {
        const credenciales = await signInAnonymously(auth);
        usuarioConectado = credenciales.user;
        console.log("✅ Conectado a Jaddy INC Cloud:", usuarioConectado.uid);
    } catch (error) {
        console.error("❌ Error de conexión:", error);
    }
};

conectar();

// --- FUNCIONES EXPORTADAS PARA TUS OTROS ARCHIVOS ---

/**
 * Guarda un producto en la colección global de Jaddy INC
 * @param {Object} datos - { nombre, referencia, precio, etc }
 */
export async function guardarProductoJaddy(datos) {
    if (!usuarioConectado) {
        console.warn("Reintentando conexión...");
        await conectar();
    }

    try {
        // Estructura de colección compatible con las reglas del servidor
        const colRef = collection(db, "jaddy_inc", appId, "productos");
        const docRef = await addDoc(colRef, {
            ...datos,
            stock: Number(datos.stock) || 0,
            precio: Number(datos.precio) || 0,
            fechaCreacion: new Date().getTime(),
            creadoPor: usuarioConectado.uid
        });
        console.log("🚀 Producto registrado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("🔥 Error al guardar producto:", error);
        throw error;
    }
}

/**
 * Escucha cambios en el catálogo para actualizar Inventario automáticamente
 * @param {Function} callback - Función que recibe la lista de productos
 */
export function obtenerCatalogoJaddy(callback) {
    const colRef = collection(db, "jaddy_inc", appId, "productos");
    
    // onSnapshot es lo que hace que los archivos se comuniquen
    return onSnapshot(colRef, (snapshot) => {
        const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        console.log("📦 Catálogo actualizado:", lista.length, "items");
        callback(lista);
    });
}

// PARA QUE TUS BOTONES HTML EN PRODUCTOS Y TU INVENTARIO JS VEAN LAS FUNCIONES:
window.guardarProductoJaddy = guardarProductoJaddy;
window.obtenerCatalogoJaddy = obtenerCatalogoJaddy;
window.jaddyDb = db; // Por si necesitas acceso directo

```
