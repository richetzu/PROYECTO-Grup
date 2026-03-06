import { StyleSheet, Text, TextComponent, View } from 'react-native'
import React, { createContext, useState } from 'react'

// LA CARPETA CONTEXT Y TODOS LOS ARCHIVOS CREADOS AQUI SIIRVEN PARA COMPARTIR
// INFORMACIÓN ENTRE COMPONENTES SIN NECESIDAD DE PASAR 
// PROPS MANUALMENTE EN CADA NIVEL DE LA JERARQUÍA DE COMPONENTES.
// ES COMO UNA BASE DE DATOS TEMPORAL O LOCAL
export const CarritoContext= createContext();

export const CarritoProvider = ({children}) => {
// CREAMOS LAS FUNCIONES QUE TENDRA NUESTRO CARRITO DE COMPRAS
// AGREGAR AL CARRITO, ELIMINAR DEL CARRITO, CALCULAR TOTAL, ETC
    const [carrito, setCarrito] = useState([]);
    
    const agregarAlCarrito = (producto) => {

    // VERIFICAMOS SI EL PRODUCTO YA ESTÁ EN EL CARRITO

        const productoExistente = carrito.find(item => item.titulo === producto.titulo);
    // SI YA ESTA SUMAMOS LA CANTIDAD, SI NO ESTA LO AGREGAMOS CON CANTIDAD 1
    

    if (productoExistente) {
            const carritoActualizado = carrito.map(item =>
                item.titulo === producto.titulo
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
            setCarrito(carritoActualizado);
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }};
    
  //  ELIMINA DEL CARRITO

        const eliminarDelCarrito = (titulo) => {
            const carritoActualizado = carrito.filter(item => item.titulo !== titulo);
            setCarrito(carritoActualizado);
        };
    
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    
    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, total }}>
            {children}
        </CarritoContext.Provider>
    );
}
