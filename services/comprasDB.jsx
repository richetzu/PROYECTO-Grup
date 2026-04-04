import { getDB } from '../database/db';



// GUARDAR COMPRA EN EL HISTORIAL
export async function guardarCompra (usuario, productos, total){
  try {
    const db=getDB();

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
export async function obtenerHistorialCompras (usuario) {
  try {
    const db=getDB();

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
export async function obtenerTodasCompras () {
  try {
    const db=getDB();

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
export async function eliminarCompra (compraId) {
  try {
    const db=getDB();

    await db.runAsync('DELETE FROM compras WHERE id = ?', [compraId]);
    return { success: true, message: 'Compra eliminada' };
  } catch (error) {
    console.error('Error al eliminar compra:', error);
    return { success: false, message: 'Error al eliminar compra' };
  }
};
