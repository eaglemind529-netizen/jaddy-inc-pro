```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
    authDomain: "apps-d45d6.firebaseapp.com",
    projectId: "apps-d45d6",
    storageBucket: "apps-d45d6.firebasestorage.app",
    messagingSenderId: "502648373937",
    appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Función para activar el punto verde y autenticar
export const conectarCerebro = async () => {
    try {
        await signInAnonymously(auth);
        console.log("Jaddy INC: Conexión establecida");
    } catch (e) {
        console.error("Error de acceso:", e);
    }
};

// Función para SUBIR o ACTUALIZAR productos
export const subirProducto = async (datos, id = null) => {
    try {
        if (id) {
            // Si hay ID, actualizamos el existente
            const docRef = doc(db, "productos", id);
            await updateDoc(docRef, datos);
            console.log("Producto actualizado:", id);
        } else {
            // Si no hay ID, creamos uno nuevo
            await addDoc(collection(db, "productos"), datos);
            console.log("Producto creado");
        }
    } catch (e) {
        console.error("Error al subir producto:", e);
        alert("Error al guardar en la base de datos");
    }
};

// Función para OBTENER productos en tiempo real
export const obtenerProductos = (callback) => {
    const q = query(collection(db, "productos"));
    return onSnapshot(q, (snapshot) => {
        const productos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(productos);
    }, (error) => {
        console.error("Error al obtener productos:", error);
    });
};

export { onAuthStateChanged };

```
