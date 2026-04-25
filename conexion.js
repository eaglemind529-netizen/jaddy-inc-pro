javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuración de la base de datos
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
const appId = "jaddy-inc-inventario"; 

// Función para conectar
export const conectarCerebro = async () => {
    const intentar = async (reintentos = 5) => {
        try {
            await signInAnonymously(auth);
            console.log("🧠 Conexión establecida con éxito");
        } catch (e) {
            if (reintentos > 0) {
                console.log(`Reintentando conexión... (${reintentos} restantes)`);
                setTimeout(() => intentar(reintentos - 1), 2000);
            } else {
                console.error("Error definitivo de conexión:", e);
            }
        }
    };
    await intentar();
};

// Guardar o Actualizar un Producto
export async function subirProducto(datos, id = null) {
    const ruta = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];
    if (id) {
        const docRef = doc(db, ...ruta, id);
        return await updateDoc(docRef, { ...datos, editado: new Date().getTime() });
    } else {
        const colRef = collection(db, ...ruta);
        return await addDoc(colRef, { ...datos, creado: new Date().getTime() });
    }
}

// Obtener productos en tiempo real
export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        callback(lista);
    }, (error) => {
        console.error("Error en tiempo real:", error);
    });
}

export { auth, onAuthStateChanged, db, appId };

```
