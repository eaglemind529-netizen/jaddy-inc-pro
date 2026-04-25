```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, setDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración Real
const firebaseConfig = {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ESTA ES LA RUTA QUE VIMOS EN TU FOTO DE FIRESTORE
const appId = "eagle-mind-inventario"; 
const rutaBase = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];

// Función para conectar y poner el punto VERDE
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("CONEXIÓN EXITOSA: EAGLE MIND ONLINE");
    } catch (e) {
        console.error("ERROR DE CONEXIÓN:", e);
    }
};

// Función para subir/editar productos
export async function subirProducto(datos, id = null) {
    try {
        if (id) {
            const docRef = doc(db, ...rutaBase, id);
            return await setDoc(docRef, { ...datos, editado: serverTimestamp() }, { merge: true });
        } else {
            const colRef = collection(db, ...rutaBase);
            return await addDoc(colRef, { ...datos, creado: serverTimestamp() });
        }
    } catch (error) {
        console.error("Error al guardar:", error);
    }
}

// Función para traer la lista de productos
export function obtenerProductos(callback) {
    const colRef = collection(db, ...rutaBase);
    const q = query(colRef, orderBy("creado", "desc"));
    
    return onSnapshot(q, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(lista);
    }, (error) => {
        console.error("Error en tiempo real:", error);
    });
}

export { onAuthStateChanged };


```
