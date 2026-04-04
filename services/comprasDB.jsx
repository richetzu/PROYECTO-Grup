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

// GUARDAR COMPRA EN EL HISTORIAL
export const guardarCompra = async (usuario, productos, total) => {
  try {
    const db = await waitForDB();

    // productos es un array de objetos: [{nombre, cantidad}, ...]
    // Lo guardamos como JSON string
    const productosJSON = JSON.stringify(productos);

    await db.runAsync(
      'INSERT INTO compras (usuario, productos, total, metoPago) VALUES (?, ?, ?, ?)',
      [usuario, productosJSON, total, 'Transferencia']
    );

    console.log('Compra guardada para:', usuario);
    return { success: true, message: 'Compra guardada' };
  } catch (error) {
    console.error('Error al guardar compra:', error);
    return { success: false, message: 'Error al guardar compra' };
  }
};

// OBTENER HISTORIAL DE COMPRAS DEL USUARIO
export const obtenerHistorialCompras = async (usuario) => {
  try {
    const db = await waitForDB();

    const compras = await db.getAllAsync(
      'SELECT * FROM compras WHERE usuario = ? ORDER BY fechaCompra DESC',
      [usuario]
    );

    // Parsear los productos JSON
    const comprasFormateadas = compras.map(compra => ({
      ...compra,
      productos: JSON.parse(compra.productos)
    }));

    console.log('Historial de compras para:', usuario, comprasFormateadas);
    return comprasFormateadas;
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return [];
  }
};

// OBTENER TODAS LAS COMPRAS (admin)
export const obtenerTodasCompras = async () => {
  try {
    const db = await waitForDB();

    const compras = await db.getAllAsync('SELECT * FROM compras ORDER BY fechaCompra DESC');

    const comprasFormateadas = compras.map(compra => ({
      ...compra,
      productos: JSON.parse(compra.productos)
    }));

    return comprasFormateadas;
  } catch (error) {
    console.error('Error al obtener todas las compras:', error);
    return [];
  }
};

// ELIMINAR COMPRA (opcional)
export const eliminarCompra = async (compraId) => {
  try {
    const db = await waitForDB();

    await db.runAsync('DELETE FROM compras WHERE id = ?', [compraId]);
    return { success: true, message: 'Compra eliminada' };
  } catch (error) {
    console.error('Error al eliminar compra:', error);
    return { success: false, message: 'Error al eliminar compra' };
  }
};
