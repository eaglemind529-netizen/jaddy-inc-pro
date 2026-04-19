```react
import React, { useState } from 'react';

/**
 * ARCHIVO PRINCIPAL: App.js (El Cerebro de Jaddy Inc. Pro)
 * * Este archivo controla qué se muestra en pantalla.
 * Está dividido en 3 bloques: Importaciones, Lógica y Diseño.
 */

export default function App() {
  // --- BLOQUE DE LÓGICA (Reglas) ---
  // Esta "llave" (estado) nos dice qué sección está viendo el usuario
  const [seccionActual, setSeccionActual] = useState('inicio');

  // Función para cambiar de habitación (sección)
  const navegarA = (nombreSeccion) => {
    setSeccionActual(nombreSeccion);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#333'
    }}>
      
      {/* --- CABECERA (IDENTIDAD CORPORATIVA) --- */}
      <header style={{
        padding: '15px',
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #eaeaea',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px', fontWeight: '900' }}>
          JADDY INC. <span style={{color: '#007bff'}}>PRO</span>
        </h1>
      </header>

      {/* --- CONTENIDO PRINCIPAL (EL ESCENARIO) --- */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        
        {/* Aquí la App decide qué mostrar según el botón presionado */}
        {seccionActual === 'inicio' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏢</div>
            <h2 style={{ margin: '0 0 10px 0' }}>Panel de Control</h2>
            <p style={{ color: '#666' }}>Bienvenido al sistema corporativo de Jaddy Inc. Selecciona una opción en el menú inferior para comenzar.</p>
          </div>
        )}

        {seccionActual === 'inventario' && <h2>Módulo de Inventario (Próximamente)</h2>}
        {seccionActual === 'ventas' && <h2>Módulo de Nueva Venta (Próximamente)</h2>}
        {seccionActual === 'clientes' && <h2>Módulo de Clientes (Próximamente)</h2>}
        {seccionActual === 'config' && <h2>Configuración y Licencia (Próximamente)</h2>}

      </main>

      {/* --- BARRA DE NAVEGACIÓN (BOTONES CÓMODOS) --- */}
      <nav style={{
        height: '80px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: '15px' // Espacio extra para pulgares en móviles
      }}>
        
        {/* Botón Inventario */}
        <button onClick={() => navegarA('inventario')} style={btnStyle}>
          <span style={{fontSize: '20px'}}>📦</span>
          <span style={labelStyle}>Stock</span>
        </button>

        {/* Botón Central de Ventas (Destacado) */}
        <button onClick={() => navegarA('ventas')} style={{
          ...btnStyle,
          backgroundColor: '#007bff',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginTop: '-30px',
          boxShadow: '0 4px 10px rgba(0,123,255,0.3)',
          color: 'white'
        }}>
          <span style={{fontSize: '30px'}}>+</span>
        </button>

        {/* Botón Clientes */}
        <button onClick={() => navegarA('clientes')} style={btnStyle}>
          <span style={{fontSize: '20px'}}>👥</span>
          <span style={labelStyle}>Clientes</span>
        </button>

        {/* Botón Configuración */}
        <button onClick={() => navegarA('config')} style={btnStyle}>
          <span style={{fontSize: '20px'}}>⚙️</span>
          <span style={labelStyle}>Admin</span>
        </button>

      </nav>
    </div>
  );
}

// Estilos rápidos para los botones
const btnStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: '10px',
  transition: 'transform 0.2s'
};

const labelStyle = {
  fontSize: '10px',
  marginTop: '4px',
  fontWeight: 'bold',
  color: '#555'
};

```
