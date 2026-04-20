```react
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// Configuración de Firebase - Verificada
const firebaseConfig = {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
  measurementId: "G-7VCRCRSCRQ"
};

// Inicialización segura
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [seccion, setSeccion] = useState('inicio');
  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState('cargando'); // cargando, listo, error

  useEffect(() => {
    // Intentamos conectar a la colección "inventario"
    const unsub = onSnapshot(collection(db, "inventario"), 
      (snapshot) => {
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(lista);
        setEstado('listo');
      }, 
      (error) => {
        console.error("Error de Firebase:", error);
        setEstado('error');
      }
    );
    return () => unsub();
  }, []);

  // Pantalla de Error si Firebase falla
  if (estado === 'error') {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-white font-bold">Error de Conexión</h1>
        <p className="text-gray-500 text-xs mt-2">No se pudo conectar con la base de datos de Firebase. Revisa tus permisos o conexión.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-white text-black text-xs font-bold rounded-full">REINTENTAR</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white font-sans overflow-hidden notranslate" translate="no">
      
      {/* Header */}
      <header className="h-16 border-b border-gray-900 bg-black flex items-center justify-between px-6 shrink-0 z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#AA8419] to-[#F1D37E] rounded flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">LX</div>
          <h1 className="uppercase tracking-[0.2em] text-sm font-black bg-gradient-to-b from-[#D4AF37] via-[#F1D37E] to-[#AA8419] bg-clip-text text-transparent">Jaddy Inc. Pro</h1>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-5 pb-28">
        
        {seccion === 'inicio' ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 rounded-full border border-gray-800 bg-[#0A0A0A] flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(212,175,55,0.1)]">👑</div>
            <div>
              <h2 className="text-2xl font-light tracking-[0.3em] uppercase">Bienvenido</h2>
              <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] mt-2">Sistema Elite Activo</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-[#D4AF37] text-2xl font-bold uppercase mb-6 tracking-tighter">Inventario</h2>
            
            {estado === 'cargando' ? (
              <div className="text-center py-20 text-gray-700 animate-pulse text-xs">SINCRONIZANDO...</div>
            ) : (
              <div className="grid gap-4">
                {productos.length > 0 ? productos.map((item) => (
                  <div key={item.id} className="bg-[#0D0D0D] border border-gray-900 p-5 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold uppercase text-xs">{item.nombre || "Producto"}</p>
                      <p className="text-gray-500 text-[9px] font-bold uppercase mt-1">Stock: {item.cantidad || 0}</p>
                    </div>
                    <div className="text-[#D4AF37] font-black text-xl">${item.precio || 0}</div>
                  </div>
                )) : (
                  <p className="text-center py-20 text-gray-800 text-xs">NO HAY DATOS EN FIREBASE</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navegación Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 border-t border-gray-900 flex items-center justify-around z-50">
        <button onClick={() => setSeccion('inicio')} className={`flex flex-col items-center flex-1 ${seccion === 'inicio' ? 'text-[#D4AF37]' : 'text-gray-700'}`}>
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-[9px] font-bold uppercase">Inicio</span>
        </button>
        <button onClick={() => setSeccion('inventario')} className={`flex flex-col items-center flex-1 ${seccion === 'inventario' ? 'text-[#D4AF37]' : 'text-gray-700'}`}>
          <span className="text-2xl mb-1">📦</span>
          <span className="text-[9px] font-bold uppercase">Stock</span>
        </button>
      </nav>

    </div>
  );
}

```
