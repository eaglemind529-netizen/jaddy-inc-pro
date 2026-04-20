```react
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// Configuración de Firebase (No tocar estas palabras en inglés)
const firebaseConfig = {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
  measurementId: "G-7VCRCRSCRQ"
};

// Inicialización de servicios
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [seccion, setSeccion] = useState('inicio');
  const [inventario, setInventario] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Listener de Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventario"), (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventario(docs);
      setCargando(false);
    }, (error) => {
      console.error("Error:", error);
      setCargando(false);
    });
    return () => unsub();
  }, []);

  return (
    // La clase "notranslate" le dice a Google Chrome que no traduzca este contenido
    <div className="flex flex-col h-screen bg-[#050505] text-white font-sans overflow-hidden notranslate" translate="no">
      
      {/* Header con Estilo Oro */}
      <header className="h-16 border-b border-gray-900 bg-black flex items-center justify-between px-6 shrink-0 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#AA8419] to-[#F1D37E] rounded flex items-center justify-center text-black font-black text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            LX
          </div>
          <h1 className="uppercase tracking-[0.2em] text-sm font-black bg-gradient-to-b from-[#D4AF37] via-[#F1D37E] to-[#AA8419] bg-clip-text text-transparent">
            Jaddy Inc. Pro
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
          <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">Sistema Activo</span>
        </div>
      </header>

      {/* Contenido Dinámico */}
      <main className="flex-1 overflow-y-auto p-5 pb-28">
        {seccion === 'inicio' ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 rounded-full border border-gray-800 bg-[#0A0A0A] flex items-center justify-center text-6xl shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]">
              👑
            </div>
            <div>
              <h2 className="text-2xl font-light tracking-[0.3em] uppercase">Bienvenido</h2>
              <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] mt-2 italic">Luxury Management System</p>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-[#D4AF37] text-2xl font-bold uppercase tracking-tighter mb-6">Inventario Elite</h2>
            
            {cargando ? (
              <div className="text-center py-20 text-gray-700 animate-pulse text-[10px] tracking-widest">SINCRONIZANDO NUBE...</div>
            ) : (
              <div className="grid gap-4">
                {inventario.map((item) => (
                  <div key={item.id} className="bg-[#0D0D0D] border border-gray-900 p-5 rounded-2xl flex justify-between items-center shadow-2xl">
                    <div className="flex flex-col">
                      <span className="text-white font-bold uppercase text-xs tracking-wider">{item.nombre || "Producto"}</span>
                      <span className="text-gray-500 text-[9px] font-bold uppercase mt-1">Stock: {item.cantidad || 0}</span>
                    </div>
                    <div className="text-[#D4AF37] font-black text-xl">${item.precio || 0}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navegación Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-md border-t border-gray-900 flex items-center justify-around z-50">
        <button onClick={() => setSeccion('inicio')} className={`flex flex-col items-center flex-1 ${seccion === 'inicio' ? 'text-[#D4AF37]' : 'text-gray-700'}`}>
          <span className="text-2xl">🏠</span>
          <span className="text-[9px] font-bold uppercase mt-1">Inicio</span>
        </button>
        <button onClick={() => setSeccion('inventario')} className={`flex flex-col items-center flex-1 ${seccion === 'inventario' ? 'text-[#D4AF37]' : 'text-gray-700'}`}>
          <span className="text-2xl">📦</span>
          <span className="text-[9px] font-bold uppercase mt-1">Stock</span>
        </button>
      </nav>

    </div>
  );
}

```
