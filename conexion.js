```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcAnybOnm9LOKgIAoykhFygp23jLyX9ZY",
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

// Función para mostrar error en pantalla (Ya que no tienes F12)
const alertarError = (msg) => {
    const div = document.createElement('div');
    div.style = "position:fixed; top:0; left:0; width:100%; background:red; color:white; z-index:9999; padding:20px; font-weight:bold; font-family:sans-serif; font-size:12px; word-break:break-all;";
    div.innerHTML = "⚠️ ERROR DE CONEXIÓN: <br>" + msg + "<br><br><button onclick='this.parentElement.remove()' style='background:white; color:black; padding:5px 10px; border:none; border-radius:5px;'>CERRAR</button>";
    document.body.appendChild(div);
};

export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("Conectado");
    } catch (e) {
        // Esto te dirá exactamente por qué falla en tu celular
        alertarError(e.code + " - " + e.message);
    }
};

export async function subirProducto(datos, id = null) {
    const ruta = ['artifacts', appId, 'public', 'data', 'productos_jaddy'];
    try {
        if (id) {
            const docRef = doc(db, ...ruta, id);
            await updateDoc(docRef, { ...datos, up: Date.now() });
        } else {
            const colRef = collection(db, ...ruta);
            await addDoc(colRef, { ...datos, date: Date.now() });
        }
        return true;
    } catch (e) {
        alertarError("Error al Guardar: " + e.code);
        throw e;
    }
}

export function obtenerProductos(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    return onSnapshot(colRef, (snap) => {
        const productos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(productos);
    }, (e) => {
        alertarError("Error al Leer: " + e.code);
    });
}

export { auth, onAuthStateChanged, db, deleteDoc, doc, collection };

```
