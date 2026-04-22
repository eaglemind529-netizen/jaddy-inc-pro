```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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

let usuarioConectado = null;

// Conexión inicial
const conectar = async () => {
    try {
        const credenciales = await signInAnonymously(auth);
        usuarioConectado = credenciales.user;
        console.log("✅ Conectado como:", usuarioConectado.uid);
    } catch (error) {
        console.error("❌ Error Auth:", error);
    }
};
conectar();

// --- FUNCIONES PARA PRODUCTOS ---

export async function guardarProductoJaddy(datos) {
    try {
        // Usamos una ruta directa para evitar errores de permisos
        const colRef = collection(db, "productos_jaddy");
        const docRef = await addDoc(colRef, {
            ...datos,
            fecha: new Date().getTime()
        });
        console.log("🚀 Registrado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("🔥 Error al guardar:", error);
        throw error;
    }
}

export function obtenerCatalogoJaddy(callback) {
    const colRef = collection(db, "productos_jaddy");
    const q = query(colRef, orderBy("nombre", "asc"));
    
    return onSnapshot(q, (snapshot) => {
        const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(lista);
    }, (error) => {
        console.error("❌ Error en tiempo real:", error);
    });
}

// Exportamos para que productos.html los vea
export { db, doc, updateDoc };

// Globales por si acaso
window.guardarProductoJaddy = guardarProductoJaddy;
window.obtenerCatalogoJaddy = obtenerCatalogoJaddy;


```
