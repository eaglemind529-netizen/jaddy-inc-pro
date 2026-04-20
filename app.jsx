```react
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// Configuración de Firebase - NO TRADUCIR
const firebaseConfig = {
  apiKey: "AIzaSyCrjjeOoXPOtJDXDfrHLOA4Ny0QW2zfVWk",
  authDomain: "apps-d45d6.firebaseapp.com",
  projectId: "apps-d45d6",
  storageBucket: "apps-d45d6.firebasestorage.app",
  messagingSenderId: "502648373937",
  appId: "1:502648373937:web:8c3beaa2a6c9289a4d9890",
  measurementId: "G-7VCRCRSCRQ"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [view, setView] = useState('inicio');
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);

  // Escucha en tiempo real de la base de datos
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventario"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInventario(items);
      setLoading(false);
    }, (error) => {
      console.error("Error Firebase:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white font-sans overflow-hidden notranslate" translate="no">
      
      {/* Header Premium */}
      <header className="h-16 border-b border-gray-900 bg-black flex items-center justify-between px-6 shrink-0 shadow-2xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#AA8419] to-[#F1D37E] rounded flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            LX
          </div>
          <h1 className="uppercase tracking-[0.2em] text-sm font-black bg-gradient-to-b from-[#D4AF37] via-[#F1D37E] to-[#AA8419] bg-clip-text text-transparent">
            Jaddy Inc. Pro
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]"></div>
          <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Online</span>
        </div>
      </header>

      {/* Contenido Dinámico */}
      <main className="flex-1 overflow-y-auto p-5 pb-24">
        {view === 'inicio' ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 rounded-full border border-gray-800 bg-[#0A0A0A] flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              👑
            </div>
            <div>
              <h2 className="text-2xl font-light tracking-[0.3em] uppercase">Bienvenido</h2>
              <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] mt-2">Sistema de Gestión de Lujo</p>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-8 duration-500">
            <div className="mb-6">
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-1">Stock Actual</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Inventario</h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-700 animate-pulse">
                <span className="text-[10px] tracking-[0.5em] uppercase">Cargando Bóveda...</span>
              </div>
            ) : (
              <div className="grid gap-4">
                {inventario.length > 0 ? inventario.map((item) => (
                  <div key={item.id} className="bg-[#0D0D0D] border border-gray-900 p-5 rounded-2xl flex justify-between items-center shadow-xl hover:border-[#D4AF37]/30 transition-all">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-bold uppercase text-xs tracking-wider">{item.nombre || "Articulo"}</span>
                      <span className="text-gray-500 text-[9px] font-bold tracking-widest uppercase">Cantidad: {item.cantidad || 0}</span>
                    </div>
                    <div className="text-[#D4AF37] font-black text-xl tracking-tighter">
                      ${item.precio || "0"}
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center border border-dashed border-gray-800 rounded-3xl">
                    <p className="text-gray-700 text-[10px] uppercase tracking-[0.3em]">No hay datos registrados</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navegación Inferior Móvil */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-lg border-t border-gray-900 flex items-center justify-around px-4 z-50">
        <button 
          onClick={() => setView('inicio')}
          className={`flex flex-col items-center justify-center flex-1 transition-all ${view === 'inicio' ? 'text-[#D4AF37] scale-110' : 'text-gray-700'}`}
        >
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-[8px] font-black uppercase tracking-widest">Inicio</span>
        </button>

        <button 
          onClick={() => setView('stock')}
          className={`flex flex-col items-center justify-center flex-1 transition-all ${view === 'stock' ? 'text-[#D4AF37] scale-110' : 'text-gray-700'}`}
        >
          <span className="text-2xl mb-1">📦</span>
          <span className="text-[8px] font-black uppercase tracking-widest">Stock</span>
        </button>

        <button className="flex flex-col items-center justify-center flex-1 text-gray-900 cursor-not-allowed">
          <span className="text-2xl mb-1 opacity-20">📊</span>
          <span className="text-[8px] font-black uppercase tracking-widest opacity-20">Ventas</span>
        </button>
      </nav>

    </div>
  );
}

```
