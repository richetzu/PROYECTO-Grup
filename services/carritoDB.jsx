import { getDB } from '../database/db';

const db = getDB();


// FUNCIONES PARA EL CARRITO DE COMPRAS
// AGREGAR AL CARRITO


export  async function agregarCarrito(producto) {
    const db = getDB();
    console.log("db:", db);
    console.log("Producto a agregar:", producto);

    const result = await db.getAllAsync(
        'SELECT * FROM carrito WHERE nombre = ?',
        [producto.nombre]
    )
    if (result.length > 0) {
        await db.runAsync(
            'UPDATE carrito SET cantidad = cantidad + 1 WHERE nombre = ?',
            [producto.nombre]
        )
    } else 
    {
        await db.runAsync(
            'INSERT INTO carrito (nombre, precio, imagen, cantidad) VALUES (?, ?, ?, ?)',
            [producto.nombre, producto.precio, producto.imagen, 1]
        );
    }
    };

// OBTENER TODOS LOS PRODUCTOS DEL CARRITO
export async function obtenerCarrito() {
    const db = getDB();
    return await db.getAllAsync('SELECT * FROM carrito');
}
// ELIMINAR UN PRODUCTO DEL CARRITO
export async function eliminarCarrito(id) {
    const db = getDB ();
    await db.runAsync('DELETE FROM carrito WHERE id = ?', [id]);
}
// VACIAR EL CARRITO
export async function vaciarCarrito() {
    const db = getDB ();
    await db.runAsync('DELETE FROM carrito');
}
// AUMENTAR CANTIDAD
export async function aumentarCantidad(nombre) {
    const db = getDB();
    await db.runAsync('UPDATE carrito SET cantidad = cantidad + 1 WHERE nombre = ?', [nombre]);
}
// DISMINUIR CANTIDAD
export async function disminuirCantidad(nombre) {
    const db = getDB(); 
    const result = await db.getAllAsync( 
        'SELECT * FROM carrito WHERE nombre = ?', [nombre] ); 
        if (result.length > 0) { const item = result[0];
            if (item.cantidad > 1) { await db.runAsync(
            'UPDATE carrito SET cantidad = cantidad - 1 WHERE nombre = ?', [nombre]);
            }else { 
                // si llega a 0 se eliminara
                await db.runAsync( 
                    'DELETE FROM carrito WHERE nombre = ?', [nombre] );
                }
            }
        };
