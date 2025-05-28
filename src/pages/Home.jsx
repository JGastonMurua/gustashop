import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { CarritoContext } from '../context/CarritoContext';

function Home() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const { carrito, agregarProducto, eliminarProducto, cambiarCantidad } = useContext(CarritoContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const handleAgregar = (producto) => {
    agregarProducto(producto);
    Swal.fire({
      title: '¡Agregado!',
      text: `"${producto.title}" fue agregado al carrito.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const productosFiltrados = productos.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  const total = carrito.reduce((sum, prod) => sum + prod.price * prod.cantidad, 0);

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100 bg-dark text-white">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4" style={{ backgroundColor: 'var(--color-uva)' }}>
        <span className="navbar-brand fw-bold fs-4">GustaShop</span>
        <button
          className="btn btn-outline-light ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#carritoOffcanvas"
          aria-controls="carritoOffcanvas"
        >
          🛒 Ver Carrito
        </button>
      </nav>

      {/* ESLOGAN */}
      <div className="text-center py-4" style={{ backgroundColor: 'var(--color-uva)' }}>
        <h1 className="text-white fw-bold mb-2">GustaShop — Todo lo que querés, en un solo lugar.</h1>
        <p className="text-white m-0">Comprá fácil, rápido y seguro.</p>
      </div>

      {/* OFFCANVAS CARRITO */}
      <div
        className="offcanvas offcanvas-end text-dark"
        tabIndex="-1"
        id="carritoOffcanvas"
        aria-labelledby="carritoOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 id="carritoOffcanvasLabel">Carrito de Compras</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {carrito.length === 0 ? (
            <p className="text-muted">No hay productos en el carrito.</p>
          ) : (
            <>
              {carrito.map(producto => (
                <div key={producto.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <div className="d-flex align-items-center gap-3">
                    <img src={producto.image} alt={producto.title} width={50} style={{ objectFit: 'contain', height: 50 }} />
                    <span>{producto.title}</span>
                    <span className="text-success">${producto.price}</span>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-sm btn-secondary me-2" onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}>-</button>
                      <span>{producto.cantidad}</span>
                      <button className="btn btn-sm btn-secondary ms-2" onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}>+</button>
                    </div>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                </div>
              ))}
              <h5 className="mt-3">Total: ${total.toFixed(2)}</h5>
            </>
          )}
        </div>
      </div>

      {/* BUSCADOR + CARDS */}
      <div className="container py-4">
        <input
          type="text"
          className="form-control mb-4 mx-auto"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: '600px' }}
        />

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {productosFiltrados.map(producto => (
            <div className="col" key={producto.id}>
              <div className="card h-100 text-dark shadow-sm">
                <img
                  src={producto.image}
                  className="card-img-top p-3"
                  alt={producto.title}
                  style={{ height: '180px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title" style={{ minHeight: '3rem' }}>
                    {producto.title.length > 60 ? producto.title.slice(0, 60) + '...' : producto.title}
                  </h6>
                  <p className="text-success fw-bold">${producto.price}</p>
                  <button
                    className="btn btn-uva mt-auto"
                    onClick={() => handleAgregar(producto)}
                  >
                    🛒 Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center mt-auto py-3" style={{ backgroundColor: 'var(--color-uva)' }}>
        <p className="mb-1 fw-bold">© 2025 GustaShop - Todos los derechos reservados</p>
        <p className="mb-1">📍 Av. Corrientes 1234, CABA, Buenos Aires, Argentina</p>
        <p className="mb-1">📧 contacto@gustashop.com · 📱 WhatsApp: +54 9 11 1234-5678</p>
        <p>
          <a href="#" className="text-white text-decoration-none me-2">Instagram</a> · 
          <a href="#" className="text-white text-decoration-none mx-2">Facebook</a> · 
          <a href="#" className="text-white text-decoration-none ms-2">Términos</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
