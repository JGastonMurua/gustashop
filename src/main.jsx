import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap base
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Para que funcione el offcanvas y navbar toggle
import './App.css' // Tus estilos personalizados (color uva, footer, etc.)

// Contexto global del carrito
import { CarritoProvider } from './context/CarritoContext'

// Render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>
)
