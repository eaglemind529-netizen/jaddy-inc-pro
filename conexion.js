```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, setDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración con la API KEY CORRECTA
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
const rutaBase = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];

// 1. CONECTAR (Para poner el punto VERDE)
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("SISTEMA JADDY ONLINE");
    } catch (e) {
        console.error("Error de conexión:", e);
    }
};

// 2. GUARDAR O ACTUALIZAR (Corregido para que no falle)
export async function subirProducto(datos, id = null) {
    try {
        if (id) {
            // Usamos setDoc con merge para que no dé error si el archivo ya existe
            const docRef = doc(db, ...rutaBase, id);
            return await setDoc(docRef, { ...datos, editado: serverTimestamp() }, { merge: true });
        } else {
            // Nuevo producto
            const colRef = collection(db, ...rutaBase);
            return await addDoc(colRef, { ...datos, creado: serverTimestamp() });
        }
    } catch (error) {
        console.error("Error al subir:", error);
        alert("Error de red: Verifica tu conexión");
    }
}

// 3. LEER PRODUCTOS (Con orden automático)
export function obtenerProductos(callback) {
    const colRef = collection(db, ...rutaBase);
    // Usamos query y orderBy para que Firebase los mande ya ordenados
    const q = query(colRef, orderBy("creado", "desc"));
    
    return onSnapshot(q, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(lista);
    });
}

export { auth, onAuthStateChanged, db };


```
