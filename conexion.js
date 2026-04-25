```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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

export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("🧠 Conexión establecida con éxito");
    } catch (e) {
        console.error("Error de conexión:", e);
    }
};

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

export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        callback(lista);
    });
}

// ESTA LÍNEA ES LA QUE TE FALTABA PARA QUE VENDEDORES.HTML FUNCIONE
export { auth, onAuthStateChanged, db, appId };


```
