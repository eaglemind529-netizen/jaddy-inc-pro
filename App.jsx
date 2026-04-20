```react
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// Configuración de Firebase (Protegida contra traducciones)
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
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Escucha de datos en tiempo real
  useEffect(() => {
    const desvincular = onSnapshot(collection(db, "inventario"), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(lista);
      setCargando(false);
    }, (error) => {
      console.error("Error conectando a Firestore:", error);
      setCargando(false);
    });

    return () => desvincular();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white font-sans overflow-hidden notranslate" translate="no">
      
      {/* Encabezado Superior */}
      <header className="h-16 border-b border-[#1A1A1A] bg-black flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-[#AA8419] flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            LX
          </div>
          <h1 className="uppercase tracking-[0.2em] text-sm font-black bg-gradient-to-b from-[#D4AF37] via-[#F1D37E] to-[#AA8419] bg-clip-text text-transparent">
            Jaddy Inc. Pro
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse"></div>
          <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">Sistema Activo</span>
        </div>
      </header>

      {/* Contenido Dinámico */}
      <main className="flex-1 overflow-y-auto p-5 pb-28">
        
        {seccion === 'inicio' && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mb-6 rounded-full border border-[#1A1A1A] bg-[#0A0A0A] flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              👑
            </div>
            <h2 className="text-2xl font-extralight tracking-[0.3em] uppercase text-white mb-2">Elite Access</h2>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest max-w-[200px] leading-loose">
              Bienvenido al panel de control exclusivo de Jaddy Inc.
            </p>
          </div>
        )}

        {seccion === 'inventario' && (
          <div className="animate-in slide-in-from-bottom-5 duration-500">
            <div className="mb-8">
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-1">Módulo Actual</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Inventario</h2>
            </div>

            {cargando ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-700">
                <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-[10px] tracking-[0.5em] uppercase">Sincronizando Bóveda...</span>
              </div>
            ) : (
              <div className="grid gap-4">
                {productos.length > 0 ? productos.map((item) => (
                  <div key={item.id} className="bg-[#0D0D0D] border border-[#1A1A1A] p-5 rounded-2xl flex justify-between items-center shadow-xl group hover:border-[#D4AF37]/40 transition-all">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-bold uppercase text-xs tracking-wider group-hover:text-[#D4AF37] transition-colors">
                        {item.nombre || "Sin nombre"}
                      </span>
                      <span className="text-gray-500 text-[9px] font-bold tracking-[0.2em] uppercase">
                        Stock: <span className="text-gray-300">{item.cantidad || 0}</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#D4AF37] font-black text-xl tracking-tighter">
                        ${item.precio || "0"}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center border border-dashed border-[#1A1A1A] rounded-3xl">
                    <p className="text-gray-700 text-[10px] uppercase tracking-[0.3em]">No hay datos en la nube</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navegación Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-md border-t border-[#1A1A1A] flex items-center justify-around px-4 z-50">
        <button 
          onClick={() => setSeccion('inicio')}
          className={`flex flex-col items-center justify-center flex-1 transition-all ${seccion === 'inicio' ? 'text-[#D4AF37] scale-110' : 'text-gray-700'}`}
        >
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-[8px] font-black uppercase tracking-widest">Inicio</span>
        </button>

        <button 
          onClick={() => setSeccion('inventario')}
          className={`flex flex-col items-center justify-center flex-1 transition-all ${seccion === 'inventario' ? 'text-[#D4AF37] scale-110' : 'text-gray-700'}`}
        >
          <span className="text-2xl mb-1">📦</span>
          <span className="text-[8px] font-black uppercase tracking-widest">Stock</span>
        </button>

        <button className="flex flex-col items-center justify-center flex-1 text-gray-900 cursor-not-allowed">
          <span className="text-2xl mb-1 opacity-20">💎</span>
          <span className="text-[8px] font-black uppercase tracking-widest opacity-20">Ventas</span>
        </button>
      </nav>

    </div>
  );
}

```
