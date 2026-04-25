<script type="module">
    // Importamos las herramientas desde el archivo de conexión
    import { conectarSistema, db, collection, addDoc, serverTimestamp, APP_ID, COLLECTION_NAME } from './conexion.js';

    // 1. Activamos el punto verde visual
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    conectarSistema(dot, text);

    // 2. Aquí ya puedes usar 'db' para guardar o leer datos
    // Ejemplo: const ruta = collection(db, "artifacts", APP_ID, "public", "data", COLLECTION_NAME);
</script>

**Punto clave:** He usado la versión `10.7.1` de las librerías, que es la más estable para teléfonos móviles. Con la API Key correcta que me pasaste, este archivo ya no debería darte el error de "Conectando" infinito. ¡Dale con todo!
