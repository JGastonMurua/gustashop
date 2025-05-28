import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(id);
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      ));
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, cambiarCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
}
