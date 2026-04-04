import React, { createContext, useState } from 'react';

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuarioActivo, setUsuarioActivo] = useState('');

  return (
    <UsuarioContext.Provider value={{ usuarioActivo, setUsuarioActivo }}>
      {children}
    </UsuarioContext.Provider>
  );
};
