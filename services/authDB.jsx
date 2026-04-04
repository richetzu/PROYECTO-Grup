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

// SE REGISTRAR NUEVO USUARIO
export const registrarUsuario = async (usuario, password, email = '') => {
  try {
    const db = await waitForDB();

    // Limpiar espacios
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();

    // Validar que no esté vacío
    if (!usuarioLimpio || !passwordLimpio) {
      return { success: false, message: 'Usuario y contraseña son requeridos' };
    }

    // Verificar si el usuario ya existe
    const existe = await db.getAllAsync(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuarioLimpio]
    );

    if (existe.length > 0) {
      return { success: false, message: 'Este usuario ya está registrado' };
    }

    // Insertar nuevo usuario
    await db.runAsync(
      'INSERT INTO usuarios (usuario, password, email) VALUES (?, ?, ?)',
      [usuarioLimpio, passwordLimpio, email.trim()]
    );

    console.log('Usuario registrado:', usuarioLimpio);
    return { success: true, message: 'Registro exitoso' };
  } catch (error) {
    console.error('Error al registrar:', error);
    return { success: false, message: 'Error al registrar ' + error.message };
  }
};

// VALIDAR LOGIN
export const validarLogin = async (usuario, password) => {
  try {
    const db = await waitForDB();

    // Limpiar espacios
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();

    const resultado = await db.getAllAsync(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuarioLimpio, passwordLimpio]
    );

    if (resultado.length > 0) {
      console.log('Login exitoso para:', usuarioLimpio);
      return { success: true, message: 'Login exitoso', usuario: resultado[0] };
    } else {
      console.log('Intento de login fallido para:', usuarioLimpio);
      const todoUsuarios = await db.getAllAsync('SELECT usuario FROM usuarios');
      console.log('Usuarios en BD:', todoUsuarios);
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
  } catch (error) {
    console.error('Error al validar login:', error);
    return { success: false, message: 'Error al validar login' };
  }
};

// ELIMINAR USUARIO (opcional)
export const eliminarUsuario = async (usuario) => {
  try {
    const db = await waitForDB();

    await db.runAsync(
      'DELETE FROM usuarios WHERE usuario = ?',
      [usuario]
    );
    return { success: true, message: 'Usuario eliminado' };
  } catch (error) {
    return { success: false, message: 'Error al eliminar usuario' };
  }
};

// VER TODOS LOS USUARIOS REGISTRADOS (para debugging)
export const obtenerTodosUsuarios = async () => {
  try {
    const db = await waitForDB();
    const usuarios = await db.getAllAsync('SELECT * FROM usuarios');
    console.log('Usuarios registrados:', usuarios);
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// LIMPIAR TABLA DE USUARIOS (solo para debugging)
export const limpiarUsuarios = async () => {
  try {
    const db = await waitForDB();
    await db.runAsync('DELETE FROM usuarios');
    console.log('Tabla de usuarios limpiada');
    return { success: true };
  } catch (error) {
    console.error('Error al limpiar usuarios:', error);
    return { success: false };
  }
};
