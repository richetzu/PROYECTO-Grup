import { getDB } from '../database/db';

// Función auxiliar para esperar a que la BD esté lista
const waitForDB = async (retries = 20) => {
  for (let i = 0; i < retries; i++) {
    const db = getDB();
    if (db) return db;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error('Base de datos no disponible después de ' + retries + ' intentos');
};

// FUNCIONES PARA EL CARRITO DE COMPRAS
// AGREGAR AL CARRITO
export const agregarCarrito = async (producto) => {
  try {
    const db = await waitForDB();

    const result = await db.getAllAsync(
      'SELECT * FROM carrito WHERE nombre = ?',
      [producto.nombre]
    );

    if (result.length > 0) {
      const carritoItem = result[0];
      await db.runAsync(
        'UPDATE carrito SET cantidad = cantidad + 1 WHERE id = ?',
        [carritoItem.id]
      );
    } else {
      await db.runAsync(
        'INSERT INTO carrito (nombre, precio, imagen, cantidad) VALUES (?, ?, ?, ?)',
        [producto.nombre, producto.precio, producto.imagen, 1]
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    return { success: false, message: error.message };
  }
};

// OBTENER TODOS LOS PRODUCTOS DEL CARRITO
export const obtenerCarrito = async () => {
  try {
    const db = await waitForDB();
    
    const result = await db.getAllAsync('SELECT * FROM carrito');
    return result || [];
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    return [];
  }
};

// ELIMINAR UN PRODUCTO DEL CARRITO
export const eliminarCarrito = async (id) => {
  try {
    const db = await waitForDB();
    await db.runAsync('DELETE FROM carrito WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    return { success: false, message: error.message };
  }
};

// VACIAR EL CARRITO
export const vaciarCarrito = async () => {
  try {
    const db = await waitForDB();
    await db.runAsync('DELETE FROM carrito');
    return { success: true };
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    return { success: false, message: error.message };
  }
};