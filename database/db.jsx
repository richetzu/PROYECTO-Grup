import * as SQLite from 'expo-sqlite';

let db;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync('tienda.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS carrito (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      precio REAL,
      imagen TEXT,
      cantidad INTEGER
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS compras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT NOT NULL,
      productos TEXT NOT NULL,
      total REAL NOT NULL,
      metoPago TEXT DEFAULT 'Transferencia',
      fechaCompra DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario) REFERENCES usuarios(usuario)
    );
  `);
};

export const getDB = () => db;