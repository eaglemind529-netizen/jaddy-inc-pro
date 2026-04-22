```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, updateDoc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Usamos la configuración dinámica del entorno si existe, o la tuya como respaldo
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890"
};

const appId = typeof __app_id !== 'undefined' ? __app_id : 'jaddy-inc-inventario';

// Inicialización de servicios
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Autenticación Anónima Obligatoria para Firestore
const conectar = async () => {
    try {
        await signInAnonymously(auth);
        console.log("✅ Sistema Jaddy INC Conectado");
    } catch (error) {
        console.error("❌ Error de enlace:", error);
    }
};
conectar();

// --- FUNCIONES MEJORADAS ---

// Guardar producto con la ruta de seguridad correcta
export async function guardarProductoJaddy(datos) {
    try {
        // RUTA REQUERIDA: artifacts/{appId}/public/data/{collection}
        const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
        const docRef = await addDoc(colRef, {
            ...datos,
            timestamp: new Date().getTime()
        });
        return docRef.id;
    } catch (error) {
        console.error("🔥 Error al insertar:", error);
        throw error;
    }
}

// Obtener catálogo con manejo de errores y ordenado manual (más seguro)
export function obtenerCatalogoJaddy(callback) {
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'productos_jaddy');
    
    // Usamos una consulta simple para evitar errores de índices (Regla 2)
    return onSnapshot(colRef, (snapshot) => {
        const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        
        // Ordenamos por nombre alfabéticamente en la memoria
        lista.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
        
        callback(lista);
    }, (error) => {
        console.error("❌ Fallo en tiempo real:", error);
    });
}

// Exportamos lo necesario para actualizar productos existentes
export { db, doc, updateDoc, auth, onAuthStateChanged, appId, collection };

```
